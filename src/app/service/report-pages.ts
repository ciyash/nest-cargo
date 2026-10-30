// Detail paths from the backend pagination contract. Summary arrays are preserved.
export const REPORTS: Record<string, {paths:string[];raw:boolean}> = {
  "booking/?/delivery-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/parcel-booking-report": {
    "paths": [
      "data.*.bookings"
    ],
    "raw": false
  },
  "booking/?/all-parcel-booking-report": {
    "paths": [
      "data.*.bookings"
    ],
    "raw": false
  },
  "booking/?/parcel-report-serialNo": {
    "paths": [
      "data.*.bookings"
    ],
    "raw": false
  },
  "booking/?/parcel-cancel-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/parcel-booking-summary-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/parcel-booking-mobileNumber": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/regular-customer-booking": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/branch-Wise-collection-report": {
    "paths": [
      "branches"
    ],
    "raw": false
  },
  "booking/?/collection-summary-report": {
    "paths": [
      "branches"
    ],
    "raw": false
  },
  "booking/?/collection-toPay-report": {
    "paths": [
      "branches"
    ],
    "raw": false
  },
  "booking/?/all-collection-report": {
    "paths": [
      "branches"
    ],
    "raw": false
  },
  "booking/?/booking-typew-ise-collection": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/parcel-branch-consolidated-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/consolidated-report-branch": {
    "paths": [
      "BookingTypes.*"
    ],
    "raw": false
  },
  "booking/?/sender-receiver-gst-report": {
    "paths": [
      "bookings"
    ],
    "raw": false
  },
  "booking/?/pending-delivery-stock-report": {
    "paths": [
      "data.formattedBookings"
    ],
    "raw": false
  },
  "booking/?/parcel-status-date-difference-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/pending-delivery-luggage-report": {
    "paths": [
      "data.formattedDeliveries"
    ],
    "raw": false
  },
  "booking/?/parcel-received-stock-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/delivered-stock-report": {
    "paths": [
      "data.deliveries"
    ],
    "raw": false
  },
  "booking/?/pending-dispatch-stock-report": {
    "paths": [
      "bookings"
    ],
    "raw": false
  },
  "booking/?/dispatched-memo-report": {
    "paths": [
      "data.*"
    ],
    "raw": false
  },
  "booking/?/parcel-incoming-luggages-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "booking/?/sales-summary-branchwise": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "booking/?/summary-report": {
    "paths": [
      "summary"
    ],
    "raw": false
  },
  "booking/?/branch-account": {
    "paths": [
      "branchwise"
    ],
    "raw": false
  },
  "booking/?/acparty-account": {
    "paths": [
      "parties"
    ],
    "raw": false
  },
  "booking/?/status-wise-summary": {
    "paths": [
      "branchwiseStatus"
    ],
    "raw": false
  },
  "parcel-loading/?/parcel-loding-load": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "parcel-loading/?/offline-parcel-voucher-details": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "parcel-loading/?/parcel-offline-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-loading/?/parcel-status-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-loading/?/parcel-pending-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-loading/?/branch-to-branch-load": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "parcel-loading/?/dispatched-stock-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-unloading/?/parcel-filter-Unloading": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-unloading/?/filter": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-unloading/?/pending-delivery-report": {
    "paths": [
      "data"
    ],
    "raw": false
  },
  "parcel-unloading/?/branch-to-branch-unload": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "voucher-generate/?/credit-voucher-generate": {
    "paths": [
      "data"
    ],
    "raw": true
  },
  "voucher-generate/?/voucher-details": {
    "paths": [
      "data"
    ],
    "raw": false
  }
};
export function nextReportPage(body: any): number | null {
  const lists = [body?.pagination, ...Object.values(body?.pagination?.sections || {})] as any[];
  const pages = lists.filter(p => p?.hasNextPage && Number.isInteger(p.nextPage)).map(p => p.nextPage);
  return pages.length ? Math.min(...pages) : null;
}
function mergePath(before: any, after: any, segments: string[]): any {
  if (!segments.length) return [...(Array.isArray(before) ? before : []), ...(Array.isArray(after) ? after : [])];
  const result = {...before,...after};
  const [key,...rest] = segments;
  for (const child of key === '*' ? [...new Set([...Object.keys(before || {}),...Object.keys(after || {})])] : [key]) {
    result[child] = mergePath(before?.[child],after?.[child],rest);
  }
  return result;
}
export function mergeReportPages(before: any, after: any, paths: string[]): any {
  if (!before) return after;
  let result = {...before,...after};
  for (const pattern of paths) {
    const [key,...rest] = pattern.split('.');
    result[key] = mergePath(before?.[key],after?.[key],rest);
  }
  return result;
}
