import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/service/branch.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private api: BranchService) {}

  ngOnInit() {
    this.getProfileData();
  }



  getProfileData() {
    try {
      this.api.GetProfileData().subscribe({
        next: (response: any) => {
          console.log('Profile Data:', response);
          this.profileData = response;
          this.loading = false;
        },
      });
    } catch (error) {

    }
  }
}
