// Módulos para formularios y directivas de Angular que se importan en los componentes standalone de la aplicación.
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

// Elementos de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgOptimizedImage,
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
];