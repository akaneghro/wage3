import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Wage3Service {
  constructor() {}

  getOpenProjects(): Observable<Array<Project>> {
    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Ampliar el almacén',
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 13000,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Crear una nueva línea de distribución',
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 150000,
        amountAchieved: 10000,
        interestRate: 4,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Expandir el negocio a Asia',
        startDate: new Date(2023, 16, 1),
        endDate: new Date(2026, 1, 1),
        amountProposed: 250000,
        amountAchieved: 250000,
        interestRate: 3,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }

  getCompanyRunningProjects(): Observable<Array<Project>> {
    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Ampliar el almacén',
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 13000,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Crear una nueva línea de distribución',
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 150000,
        amountAchieved: 10000,
        interestRate: 4,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Expandir el negocio a Asia',
        startDate: new Date(2023, 16, 1),
        endDate: new Date(2026, 1, 1),
        amountProposed: 250000,
        amountAchieved: 250000,
        interestRate: 3,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }

  getLoanedProjects(): Observable<Array<Project>> {
    const projects: Project[] = <Array<Project>>[
      <Project>{
        title: 'Ampliar el almacén',
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 50000,
        amountAchieved: 13000,
        interestRate: 5,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Crear una nueva línea de distribución',
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2025, 1, 1),
        amountProposed: 150000,
        amountAchieved: 10000,
        interestRate: 4,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
      <Project>{
        title: 'Expandir el negocio a Asia',
        startDate: new Date(2023, 16, 1),
        endDate: new Date(2026, 1, 1),
        amountProposed: 250000,
        amountAchieved: 250000,
        interestRate: 3,
        ownerAddress: '0x23d902C743C8bF187659dC7107263de429DE9832',
      },
    ];
    return of(projects);
  }
}
