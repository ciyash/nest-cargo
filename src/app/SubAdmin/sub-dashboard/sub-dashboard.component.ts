import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-sub-dashboard',
  templateUrl: './sub-dashboard.component.html',
  styleUrls: ['./sub-dashboard.component.scss']
})
export class SubDashboardComponent {

}
