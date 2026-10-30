import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './service/auth.guard';
import { cauthGuardGuard } from './service/cauth-guard.guard';


import { companyGuard } from './service/company.guard';

const routes: Routes = [
  {path: 'company-register', redirectTo: 'signup', pathMatch: 'full'},
  {path:"login",loadComponent: () => import('./USER/login/login.component').then(m => m.LoginComponent) },
   {path:"clogin",loadComponent: () => import('./USER/company-login/company-login.component').then(m => m.CompanyLoginComponent) },
  {path:"",loadComponent: () => import('./USER/login/login.component').then(m => m.LoginComponent) },
  {path:"signup",loadComponent: () => import('./USER/signup/signup.component').then(m => m.SignupComponent) },
  {path:"dashboard",loadComponent: () => import('./USER/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard], },


  {path:"booking",loadComponent: () => import('./Branch/parcelbooking/parcelbooking.component').then(m => m.ParcelbookingComponent), canActivate: [authGuard] },
  {path:'parcelloading',loadComponent: () => import('./Branch/parcelloading/parcelloading.component').then(m => m.ParcelloadingComponent), canActivate: [authGuard]},
  {path:'bookingreport',loadComponent: () => import('./Branch/booking-report/booking-report.component').then(m => m.BookingReportComponent), canActivate: [authGuard]},
  { path: 'printgrn/:grnNo', loadComponent: () => import('./Branch/print-grn-number/print-grn-number.component').then(m => m.PrintGrnNumberComponent), canActivate: [authGuard] },
  {path:'parcelloadingdata',loadComponent: () => import('./Branch/parcel-loading-data/parcel-loading-data.component').then(m => m.ParcelLoadingDataComponent), canActivate: [authGuard]},
  {path:'cancel-booking',loadComponent: () => import('./Branch/cancel-booking/cancel-booking.component').then(m => m.CancelBookingComponent), canActivate: [authGuard]},

  {path:'parcelunloading',loadComponent: () => import('./Branch/parcel-onloading/parcel-onloading.component').then(m => m.ParcelOnloadingComponent), canActivate: [authGuard]},
  {path:'parcelonloadingdata',loadComponent: () => import('./Branch/parcel-on-loading-data/parcel-on-loading-data.component').then(m => m.ParcelOnLoadingDataComponent), canActivate: [authGuard]},
  { path: 'profile', loadComponent: () => import('./USER/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'parcel-branch', loadComponent: () => import('./Branch/parcel-branch/parcel-branch.component').then(m => m.ParcelBranchComponent), canActivate: [authGuard] },
  { path: 'barnchtobranchunloading', loadComponent: () => import('./Branch/brach-to-branch-unloading/brach-to-branch-unloading.component').then(m => m.BrachToBranchUnloadingComponent), canActivate: [authGuard] },
  { path: 'addpackagestype', loadComponent: () => import('./Branch/add-packages-type/add-packages-type.component').then(m => m.AddPackagesTypeComponent), canActivate: [authGuard] },
  { path: 'searchgrn', loadComponent: () => import('./Branch/Widgets/search-grn-number/search-grn-number.component').then(m => m.SearchGrnNumberComponent), canActivate: [authGuard] },
  { path: 'gnrnumberstatus', loadComponent: () => import('./Branch/filter-grn/filter-grn.component').then(m => m.FilterGrnComponent), canActivate: [authGuard] },
  { path: 'printvouchersdata/:vocherNoUnique', loadComponent: () => import('./Branch/print-voucherslist-data/print-voucherslist-data.component').then(m => m.PrintVoucherslistDataComponent), canActivate: [authGuard] },
  { path: 'voucherslistoffline', loadComponent: () => import('./Branch/voucer-offline-list/voucer-offline-list.component').then(m => m.VoucerOfflineListComponent), canActivate: [authGuard] },
  { path: 'addpackagetype', loadComponent: () => import('./Branch/add-packages-type/add-packages-type.component').then(m => m.AddPackagesTypeComponent), canActivate: [authGuard],},
  { path: 'parcel-delivery', loadComponent: () => import('./Branch/parcel-delivery/parcel-delivery.component').then(m => m.ParcelDeliveryComponent), canActivate: [authGuard],},

  { path: 'addcfmaster', loadComponent: () => import('./Branch/Cfmaster/add-cfmaster/add-cfmaster.component').then(m => m.AddCfmasterComponent), canActivate: [authGuard] },
  { path: 'getcfmasterdata', loadComponent: () => import('./Branch/Cfmaster/get-cfmaster-data/get-cfmaster-data.component').then(m => m.GetCfmasterDataComponent), canActivate: [authGuard] },
  { path: 'creditvouchergenerate', loadComponent: () => import('./Branch/Cfmaster/credit-voucher-generate/credit-voucher-generate.component').then(m => m.CreditVoucherGenerateComponent), canActivate: [authGuard] },
  { path: 'voucherdetailscf', loadComponent: () => import('./Branch/Cfmaster/voucher-details-cfmaster/voucher-details-cfmaster.component').then(m => m.VoucherDetailsCfmasterComponent), canActivate: [authGuard] },
  { path: 'voucher-report', loadComponent: () => import('./Branch/Cfmaster/vocher-details-report/vocher-details-report.component').then(m => m.VocherDetailsReportComponent), canActivate: [authGuard] },


  { path: 'dispatchedreport', loadComponent: () => import('./Branch/dispatched-report/dispatched-report.component').then(m => m.DispatchedReportComponent), canActivate: [authGuard] },
  { path: 'reportsdashboard', loadComponent: () => import('./Branch/Reports/branch-reports-dashboard/branch-reports-dashboard.component').then(m => m.BranchReportsDashboardComponent), canActivate: [authGuard] },
  { path: 'regularcustmer', loadComponent: () => import('./Branch/Reports/regularcustomer-booking/regularcustomer-booking.component').then(m => m.RegularcustomerBookingComponent), canActivate: [authGuard] },
  { path: 'bookingserial', loadComponent: () => import('./Branch/Reports/parcelbooking-serialno/parcelbooking-serialno.component').then(m => m.ParcelbookingSerialnoComponent), canActivate: [authGuard] },
  { path: 'reports', loadComponent: () => import('./Branch/Reports/parcel-booking-report/parcel-booking-report.component').then(m => m.ParcelBookingReportComponent), canActivate: [authGuard] },
  {path:'allpercelbooking',loadComponent: () => import('./Branch/Reports/all-parcel-booking-report/all-parcel-booking-report.component').then(m => m.AllParcelBookingReportComponent),canActivate: [authGuard] },
  {path:'bookingmobile',loadComponent: () => import('./Branch/Reports/parcel-booking-mobile/parcel-booking-mobile.component').then(m => m.ParcelBookingMobileComponent), canActivate: [authGuard]},
  {path:'cancelreport',loadComponent: () => import('./Branch/Reports/parcel-cancel/parcel-cancel.component').then(m => m.ParcelCancelComponent), canActivate: [authGuard]},
  {path:'bookingsummary',loadComponent: () => import('./Branch/Reports/parcel-booking-summary/parcel-booking-summary.component').then(m => m.ParcelBookingSummaryComponent), canActivate: [authGuard]},
  {path:'collectionreport',loadComponent: () => import('./Branch/Reports/collection-report/collection-report.component').then(m => m.CollectionReportComponent), canActivate: [authGuard]},
  {path:'Consolidate',loadComponent: () => import('./Branch/Reports/consolidated/consolidated.component').then(m => m.ConsolidatedComponent), canActivate: [authGuard]},
  {path:'gdtreport',loadComponent: () => import('./Branch/Reports/gst-report/gst-report.component').then(m => m.GstReportComponent), canActivate: [authGuard]},
  {path:'gstdata',loadComponent: () => import('./Branch/Reports/gst-data/gst-data.component').then(m => m.GstDataComponent), canActivate: [authGuard]},
  {path:'pending-delivery',loadComponent: () => import('./Branch/Reports/pending-delivery-stock-report/pending-delivery-stock-report.component').then(m => m.PendingDeliveryStockReportComponent), canActivate: [authGuard]},
  {path:'collectiondata',loadComponent: () => import('./Branch/Reports/collection-data/collection-data.component').then(m => m.CollectionDataComponent), canActivate: [authGuard]},

  {path:'parcelstatusdate',loadComponent: () => import('./Branch/Reports/parcel-status-date-different/parcel-status-date-different.component').then(m => m.ParcelStatusDateDifferentComponent), canActivate: [authGuard]},
  {path:'datereport',loadComponent: () => import('./Branch/Reports/status-date-report/status-date-report.component').then(m => m.StatusDateReportComponent), canActivate: [authGuard]},
  {path:'devliveryreport',loadComponent: () => import('./Branch/Reports/delivery-stock-report/delivery-stock-report.component').then(m => m.DeliveryStockReportComponent), canActivate: [authGuard]},
  {path:'pendingluggage',loadComponent: () => import('./Branch/Reports/pending-delivery-luggage-report/pending-delivery-luggage-report.component').then(m => m.PendingDeliveryLuggageReportComponent), canActivate: [authGuard]},
  {path:'receivedstock-report',loadComponent: () => import('./Branch/Reports/parcel-received-stock-report/parcel-received-stock-report.component').then(m => m.ParcelReceivedStockReportComponent), canActivate: [authGuard]},
  {path:'incoming-report',loadComponent: () => import('./Branch/Reports/parcel-incoming-luggages-report/parcel-incoming-luggages-report.component').then(m => m.ParcelIncomingLuggagesReportComponent), canActivate: [authGuard]},
  {path:'parcelincomingreport',loadComponent: () => import('./Branch/Reports/parcel-incoming-report/parcel-incoming-report.component').then(m => m.ParcelIncomingReportComponent), canActivate: [authGuard]},
  {path:'dispacthed-memo-report',loadComponent: () => import('./Branch/Reports/dispatched-memo-report/dispatched-memo-report.component').then(m => m.DispatchedMemoReportComponent), canActivate: [authGuard]},
  {path:'pending-dispatchedStock-report',loadComponent: () => import('./Branch/Reports/pending-dispatched-stock-report/pending-dispatched-stock-report.component').then(m => m.PendingDispatchedStockReportComponent), canActivate: [authGuard]},
  {path:'parcelloading-offlinereport',loadComponent: () => import('./Branch/Reports/parcel-loading-offline-report/parcel-loading-offline-report.component').then(m => m.ParcelLoadingOfflineReportComponent), canActivate: [authGuard]},
  {path:'dispatched-stock-report',loadComponent: () => import('./Branch/Reports/dispatched-stock-report/dispatched-stock-report.component').then(m => m.DispatchedStockReportComponent), canActivate: [authGuard]},
  {path:'report-delivery',loadComponent: () => import('./Branch/Reports/report-delivery/report-delivery.component').then(m => m.ReportDeliveryComponent), canActivate: [authGuard]},

    { path: 'create-admin', loadComponent: () => import('./USER/company-workspace/company-workspace.component').then(m => m.CompanyWorkspaceComponent),canActivate: [companyGuard]},


  { path: 'createemployee', loadComponent: () => import('./pages/Admin/create-employee/create-employee.component').then(m => m.CreateEmployeeComponent), canActivate: [authGuard],data: { roles: ['admin'] }},

  { path: 'createbranch', loadComponent: () => import('./pages/Admin/create-branch/create-branch.component').then(m => m.CreateBranchComponent), canActivate: [cauthGuardGuard], data: { roles: ['admin'] }},
  { path: 'adminprofile', loadComponent: () => import('./pages/Admin/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent), canActivate: [authGuard], data: { roles: ['admin'] }},
  { path: 'createvehicle', loadComponent: () => import('./pages/Admin/create-vehicle/create-vehicle.component').then(m => m.CreateVehicleComponent), canActivate: [authGuard], data: { roles: ['admin'] }},
  { path: 'createcity', loadComponent: () => import('./pages/Admin/create-cityname/create-cityname.component').then(m => m.CreateCitynameComponent), canActivate: [authGuard], data: { roles: ['admin'] }},
  { path: 'adddispatchtype', loadComponent: () => import('./pages/Admin/add-dispatch-type/add-dispatch-type.component').then(m => m.AddDispatchTypeComponent), canActivate: [authGuard], data: { roles: ['admin'] }},
  { path: 'addextracharges', loadComponent: () => import('./pages/Admin/add-extra-charges/add-extra-charges.component').then(m => m.AddExtraChargesComponent), canActivate: [authGuard], data: { roles: ['admin'] }},


  { path: 'employee-dashboard', loadComponent: () => import('./empolyee/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-booking', loadComponent: () => import('./empolyee/booking/booking.component').then(m => m.BookingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-loading', loadComponent: () => import('./empolyee/loading/loading.component').then(m => m.LoadingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-unloading', loadComponent: () => import('./empolyee/unloading/unloading.component').then(m => m.UnloadingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-branch-loading', loadComponent: () => import('./empolyee/branch-to-branch-loading/branch-to-branch-loading.component').then(m => m.BranchToBranchLoadingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-parcel-devlivery', loadComponent: () => import('./Branch/parcel-delivery/parcel-delivery.component').then(m => m.ParcelDeliveryComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-parcel-cancel', loadComponent: () => import('./Branch/cancel-booking/cancel-booking.component').then(m => m.CancelBookingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-status', loadComponent: () => import('./Branch/filter-grn/filter-grn.component').then(m => m.FilterGrnComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-branch-unloading', loadComponent: () => import('./empolyee/branch-to-branch-unloading/branch-to-branch-unloading.component').then(m => m.BranchToBranchUnloadingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
  { path: 'employee-voucherdetails', loadComponent: () => import('./empolyee/voucher-details-list/voucher-details-list.component').then(m => m.VoucherDetailsListComponent), canActivate: [authGuard],data: { roles: ['employee'] }},



{ path: 'todaybooking', loadComponent: () => import('./empolyee/Reports/todaybooking/todaybooking.component').then(m => m.TodaybookingComponent), canActivate: [authGuard],data: { roles: ['employee'] }},
{ path: 'employee-printgrn/:grnNo', loadComponent: () => import('./Branch/print-grn-number/print-grn-number.component').then(m => m.PrintGrnNumberComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'collection-report', loadComponent: () => import('./empolyee/Reports/collectionreport/collectionreport.component').then(m => m.CollectionreportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'conslidated-report', loadComponent: () => import('./empolyee/Reports/conslidated-report/conslidated-report.component').then(m => m.ConslidatedReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'parcel-status', loadComponent: () => import('./empolyee/Reports/report-status-date/report-status-date.component').then(m => m.ReportStatusDateComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'pending-deliverystock', loadComponent: () => import('./empolyee/Reports/pendingdelivery-stock/pendingdelivery-stock.component').then(m => m.PendingdeliveryStockComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'pending-luggage', loadComponent: () => import('./empolyee/Reports/pendingdevlivery-luggagereport/pendingdevlivery-luggagereport.component').then(m => m.PendingdevliveryLuggagereportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'dispacthedstock-report', loadComponent: () => import('./empolyee/dispatchedstock-report/dispatchedstock-report.component').then(m => m.DispatchedstockReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'received-stock', loadComponent: () => import('./empolyee/Reports/receivedstock-report/receivedstock-report.component').then(m => m.ReceivedstockReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'deliverystock-report', loadComponent: () => import('./empolyee/Reports/delivery-report/delivery-report.component').then(m => m.DeliveryReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'pendingdispached-stock-report', loadComponent: () => import('./empolyee/Reports/pendingdispacthedstock-report/pendingdispacthedstock-report.component').then(m => m.PendingdispacthedstockReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'memo-stock-report', loadComponent: () => import('./empolyee/Reports/disptched-memo-report/disptched-memo-report.component').then(m => m.DisptchedMemoReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'incomingreport', loadComponent: () => import('./empolyee/Reports/incoming-report/incoming-report.component').then(m => m.IncomingReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },
{ path: 'dashboard-report', loadComponent: () => import('./empolyee/Reports/dashboard-report/dashboard-report.component').then(m => m.DashboardReportComponent), canActivate: [authGuard],data: { roles: ['employee'] } },


  {path:"sub-booking",loadComponent: () => import('./SubAdmin/sub-booking/sub-booking.component').then(m => m.SubBookingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-loading",loadComponent: () => import('./SubAdmin/sub-loading/sub-loading.component').then(m => m.SubLoadingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-unloading",loadComponent: () => import('./SubAdmin/sub-unloading/sub-unloading.component').then(m => m.SubUnloadingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-branch-loading",loadComponent: () => import('./SubAdmin/sub-branch-to-branch-loading/sub-branch-to-branch-loading.component').then(m => m.SubBranchToBranchLoadingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-branch-unloading",loadComponent: () => import('./SubAdmin/sub-branch-to-branch-unloading/sub-branch-to-branch-unloading.component').then(m => m.SubBranchToBranchUnloadingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-parcelvoucher-details",loadComponent: () => import('./SubAdmin/parcel-voucher-details/parcel-voucher-details.component').then(m => m.ParcelVoucherDetailsComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},


  {path:"sub-todaybooking",loadComponent: () => import('./SubAdmin/Reports/sub-todaybooking/sub-todaybooking.component').then(m => m.SubTodaybookingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-dashboard",loadComponent: () => import('./SubAdmin/Reports/sub-dashboard-booking/sub-dashboard-booking.component').then(m => m.SubDashboardBookingComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-collection",loadComponent: () => import('./SubAdmin/Reports/sub-collection/sub-collection.component').then(m => m.SubCollectionComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-consolidate",loadComponent: () => import('./SubAdmin/Reports/consolidate/consolidate.component').then(m => m.ConsolidateComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-datedifferent",loadComponent: () => import('./SubAdmin/Reports/sub-status-date-different/sub-status-date-different.component').then(m => m.SubStatusDateDifferentComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-pendingdelivery",loadComponent: () => import('./SubAdmin/Reports/sub-pending-delivery-stock/sub-pending-delivery-stock.component').then(m => m.SubPendingDeliveryStockComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-pendingluaggage",loadComponent: () => import('./SubAdmin/Reports/sub-pending-delivery-luggage/sub-pending-delivery-luggage.component').then(m => m.SubPendingDeliveryLuggageComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-dispatched",loadComponent: () => import('./SubAdmin/Reports/sub-dispatched-stock/sub-dispatched-stock.component').then(m => m.SubDispatchedStockComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-received",loadComponent: () => import('./SubAdmin/Reports/sub-received-stock/sub-received-stock.component').then(m => m.SubReceivedStockComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-deliverystock",loadComponent: () => import('./SubAdmin/Reports/sub-delivery-stock/sub-delivery-stock.component').then(m => m.SubDeliveryStockComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-pendingdispatch",loadComponent: () => import('./SubAdmin/Reports/sub-pending-dispatch-stock/sub-pending-dispatch-stock.component').then(m => m.SubPendingDispatchStockComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-memo-dispathed",loadComponent: () => import('./SubAdmin/Reports/sub-memo-dispatched/sub-memo-dispatched.component').then(m => m.SubMemoDispatchedComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},
  {path:"sub-incoming-luggage",loadComponent: () => import('./SubAdmin/Reports/sub-incoming-luggage/sub-incoming-luggage.component').then(m => m.SubIncomingLuggageComponent), canActivate: [authGuard], data: { roles: ['subadmin'] }},

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
