// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
    * @title Wage3
    * A smart contract smart contract that allows the contract owner to create 
    * projects and finance them with loans from employees. The contract owner can 
    * specify the amount, interest rate, start and end dates for financing, 
    * and other project details. Employees can then loan the project and claim their 
    * loan with interest once the project is completed.
    * @author bertoaf
 */
contract Wage3 {
    address public owner;

    uint256 private _counter;

    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;

    enum ProjectState {
        INACTIVE,
        FINANCING,
        ACTIVE,
        COMPLETED
    }

    struct Employee {
        address employeeAddress;
        uint256 amount;
    }
    
    struct Project {
        uint256 id;
        string name;
        string description;
        uint256 amount;
        uint256 interestRate;
        uint256 startDateFinancing;
        uint256 endDateFinancing;
        uint256 endDateProject;
        ProjectState state;
        Employee[] employees;
    }

    Project[] private projects;
    
    mapping(uint256 => Project) private projectsFromId;

    mapping(address => uint256) public totalFinancedByEmployee;

    constructor() {
        owner = msg.sender;
        _counter = 0;

        createMockProject("International Expansion", "Prject1", 1000000000000000000, 4, 1690858139, 1693536539, 1696128539);
        createMockProject("Renewable Energies", "Project2", 12000000000000000000, 5, 1696128539, 1697770139, 1703821739);
        createMockProject("Research and development", "Project4", 15000000000000000000, 3, 1692931739, 1695610139, 1696042139);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyProjectEmployee(uint256 _projectId) {
        bool exists = false;
        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            if (projectsFromId[_projectId].employees[i].employeeAddress == msg.sender) {
                exists = true;
            }
        }

        require(
            exists,
            "Only an employee of this project can call this function"
        );
        _;
    }

    modifier availableToLoan(uint256 _projectId, uint256 _loanAmount) {
        uint256 totalFinanced = 0;
        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            totalFinanced += projectsFromId[_projectId].employees[i].amount;
        }
        require((totalFinanced + _loanAmount) <= projectsFromId[_projectId].amount, "Amount higher than required" );
        _;
    }


    // W R I T I N G   F U N C T I O N S //

    /**
        * Creates a new project with the specified details.
        * Only the contract owner can call this function
        * @param _name The name of the project. It represents the identifier
        * @param _description The description of the project
        * @param _amount The amount of the project
        * @param _interestRate The interest rate of the project
        * @param _startDateFinancing The start date of the financing period
        * @param _endDateFinancing The end date of the financing period
     */
    function createProject(
        string memory _name,
        string memory _description,
        uint256 _amount,
        uint256 _interestRate,
        uint256 _startDateFinancing,
        uint256 _endDateFinancing,
        uint256 _endDateProject
    ) external onlyOwner {        
        require(_amount > 0, "Amount must be greater than 0");
        require(_startDateFinancing < _endDateFinancing, "Invalid date range");
        
        _counter += 1;

        Project storage newProject = projectsFromId[_counter];
        newProject.id = _counter;
        newProject.name = _name;
        newProject.description = _description;
        newProject.amount = _amount;
        newProject.interestRate = _interestRate;
        newProject.startDateFinancing = _startDateFinancing;
        newProject.endDateFinancing = _endDateFinancing;
        newProject.endDateProject =_endDateProject;

        if (block.timestamp >= _startDateFinancing) {
            newProject.state = ProjectState.FINANCING;
        } else {
            newProject.state = ProjectState.INACTIVE;
        }

        projects.push(newProject);
    }

    function createMockProject(
        string memory _name,
        string memory _description,
        uint256 _amount,
        uint256 _interestRate,
        uint256 _startDateFinancing,
        uint256 _endDateFinancing,
        uint256 _endDateProject
    ) private {
        _counter++;
        Project storage project = projectsFromId[_counter];
        project.id = _counter;
        project.name = _name;
        project.description = _description;
        project.amount = _amount;
        project.interestRate = _interestRate;
        project.startDateFinancing = _startDateFinancing;
        project.endDateFinancing = _endDateFinancing;
        project.endDateProject = _endDateProject;        
        
        if (block.timestamp >= _startDateFinancing) {
            project.state = ProjectState.FINANCING;
        } else {
            project.state = ProjectState.INACTIVE;
        }

        projects.push(project);
    }

    /**
        * Loan an amount for the specific project
        * Only the contract owner can call this function
        * @param _projectId The id of the project
     */
    function loanProject(uint256 _projectId, uint256 _amount) external payable  availableToLoan(_projectId, _amount) {
        Project storage project = projectsFromId[_projectId];
        require(msg.sender != owner, "The owner can't loan");
        require(project.state == ProjectState.FINANCING, "Project is not available for financing");
        require(_amount > 0 && _amount <= project.amount, "Invalid loan amount");
        
        bool exists = checkEmployeeExists(_projectId);

        if (!exists){
            project.employees.push(Employee({
                employeeAddress: msg.sender,
                amount: _amount
            }));

            addEmployeeToProjects(_projectId, _amount);
        } else {
            addEmployeeAmount(_projectId, _amount);
            addEmployeeAmountToProjects(_projectId, _amount);
        }
        
        totalFinancedByEmployee[msg.sender] += _amount;
        
        // Check if the project is fully financed
        uint256 totalFinanced = getFinanciedProjectAmount(_projectId);
        
        if (totalFinanced >= project.amount) {
            project.state = ProjectState.ACTIVE;
        }
    }

    /**
        * Claims the loan with interest of the specified project.
        * Only an employee of the project can call this function
        * @param _projectId The id of the project
     */
    function claimLoanWithInterest(uint256 _projectId) external onlyProjectEmployee(_projectId) {
        Project memory project = projectsFromId[_projectId];
        require(block.timestamp >= project.endDateProject, "Loan cannot be claimed yet");

        uint256 employeeAmount = getEmployeeAmount(_projectId);
        
        uint256 interestAmount = (employeeAmount * project.interestRate) / 100;
        uint256 totalAmount = employeeAmount + interestAmount;
        
        // Transfer the total amount to the employee
        payable(msg.sender).transfer(totalAmount);
    }

    /**
        * Claims the loan amount of the specified project.
        * @param _projectId The index of the project
     */
    function claimLoanWithoutInterest (uint256 _projectId) external onlyProjectEmployee(_projectId) {
        Project memory project = projectsFromId[_projectId];
        require(block.timestamp >= project.endDateFinancing, "Cannot claim the amount because the project already started");
        
        uint256 amount = getEmployeeAmount(_projectId);

        // Transfer the total amount to the employee
        payable(msg.sender).transfer(amount);
    }

    /**
    * Withdraw the project amount to the owner if the project is completed
    * @param _projectId The id project
    */
    function withdrawProjectAmount(uint256 _projectId) external onlyOwner {
        Project memory project = projectsFromId[_projectId];
        require(project.state == ProjectState.ACTIVE, "Project is not at ACTIVE state");

        uint256 amount = getFinanciedProjectAmount(_projectId);

        // Transfer the total amount to the owner
        payable(msg.sender).transfer(amount);
    }

    /**
        * Sum the amount sent from employee to the amount in the specified proyect
        * @param _projectId The id of the project
    */
    function addEmployeeAmount(uint256 _projectId, uint256 _amount) private {
        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            if (projectsFromId[_projectId].employees[i].employeeAddress == msg.sender) {
                projectsFromId[_projectId].employees[i].amount += _amount;
            }
        }
    }

    /**
        * Sum the amount sent from employee to the amount in the specified proyect in te projects array
        * @param _projectId The id of the project
    */
    function addEmployeeAmountToProjects(uint256 _projectId, uint256 _amount) private {
        for (uint256 i = 0; i < projects.length; i++) {
            if (projects[i].id == _projectId) {
                for (uint256 j = 0; j < projects[i].employees.length; j++) {
                    if (projects[i].employees[j].employeeAddress == msg.sender){
                        projects[i].employees[j].amount += _amount;
                    }
                }
            }
        }
    }

    /**
        * Add an employee to a proyect
        * @param _projectId The id of the project
        * @param _amount The amount that the employee loans
    */
    function addEmployeeToProjects(uint256 _projectId, uint256 _amount) private {
        for (uint256 i = 0; i < projects.length; i++) {
            if (projects[i].id == _projectId) {
                projects[i].employees.push(Employee({
                    employeeAddress: msg.sender,
                    amount: _amount
                }));
            }
        }
    }





    // R E A D I N G   F U N C T I O N S //

    /**
        * Return all projects
    */
    function getProjects() external view returns (Project[] memory) {
        return projects;
    }

    /**
        * Returns the number of completed projects.
    */
    function getProjectProperties(uint256 _projectId) external view returns (Project memory) {
        return projectsFromId[_projectId];
    }

    /**
        * Returns if the employee already exists in the specified project
        * @param _projectId The id of the project
    */
    function checkEmployeeExists(uint256 _projectId) private view returns (bool) {
        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            if (projectsFromId[_projectId].employees[i].employeeAddress == msg.sender) {
                return true;
            }
        }
        return false;
    }

    /**
        * Get the employee amount of a specified project
        * @param _projectId The id of the project
    */
    function getEmployeeAmount(uint256 _projectId) private view returns (uint256) {
        uint256 emplyeeAmount = 0;
        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            if (projectsFromId[_projectId].employees[i].employeeAddress == msg.sender) {
                emplyeeAmount = projectsFromId[_projectId].employees[i].amount;
            }
        }

        return emplyeeAmount;
    }

    /** 
        * Returns the total financied amount of the specified project
        * @param _projectId The id of the project
    */
    function getFinanciedProjectAmount(uint256 _projectId) private view returns (uint256) {
        uint256 totalFinanced = 0;

        for (uint256 i = 0; i < projectsFromId[_projectId].employees.length; i++) {
            totalFinanced += projectsFromId[_projectId].employees[i].amount;
        }

        return totalFinanced;
    }

    /**
        * Returns the total amount financed by the specified employee.
     */
    function getTotalFinancedByEmployee() external view returns (uint256) {
        return totalFinancedByEmployee[msg.sender];
    }
}
