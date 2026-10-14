import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { RouteConfigLoadEnd, RouterModule } from '@angular/router';
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
    MatIconModule
]

