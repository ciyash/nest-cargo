import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  selector: 'app-branch-collection-report',
  templateUrl: './branch-collection-report.component.html',
  styleUrls: ['./branch-collection-report.component.scss']
})
export class BranchCollectionReportComponent {

}
