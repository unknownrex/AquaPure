function generateReport() {
   const locationSelect = document.getElementById('reportLocation');
   const deviceSelect = document.getElementById('reportDevice');
   const location = locationSelect.value;
   const device = deviceSelect.value;
   const startDate = document.getElementById('startDate').value;
   const endDate = document.getElementById('endDate').value;
   
   if (!location || location === 'Select location' || !device || device === 'Select device' || !startDate || !endDate) {
      alert('Please fill in all fields to generate a report');
      return;
   }
   
   const locationText = locationSelect.options[locationSelect.selectedIndex].text;
   const deviceText = deviceSelect.options[deviceSelect.selectedIndex].text;
   
   const preview = document.getElementById('reportPreview');
   preview.innerHTML = `
      <div style="color: var(--color-text);">
         <h4 class="mb-3" style="font-weight: 600;">Water Quality Report</h4>
         <div class="row mb-3">
            <div class="col-md-6">
               <p class="mb-1"><strong>Location:</strong> ${locationText}</p>
               <p class="mb-1"><strong>Device:</strong> ${deviceText}</p>
            </div>
            <div class="col-md-6">
               <p class="mb-1"><strong>Period:</strong> ${startDate} to ${endDate}</p>
               <p class="mb-1"><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
         </div>
         <hr style="border-color: var(--color-border);">
         <h6 class="mt-3 mb-3" style="font-weight: 600;">Summary Statistics</h6>
         <div class="row g-3">
            <div class="col-md-3">
               <div class="p-3 rounded" style="background-color: var(--color-phlevel-bg);">
                  <small style="color: var(--color-secondary-text);">Avg pH Level</small>
                  <h5 class="mb-0 mt-1" style="color: var(--color-phlevel); font-weight: 600;">7.2</h5>
               </div>
            </div>
            <div class="col-md-3">
               <div class="p-3 rounded" style="background-color: var(--color-turbidity-bg);">
                  <small style="color: var(--color-secondary-text);">Avg Turbidity</small>
                  <h5 class="mb-0 mt-1" style="color: var(--color-turbidity); font-weight: 600;">2.3 NTU</h5>
               </div>
            </div>
            <div class="col-md-3">
               <div class="p-3 rounded" style="background-color: var(--color-temperature-bg);">
                  <small style="color: var(--color-secondary-text);">Avg Temperature</small>
                  <h5 class="mb-0 mt-1" style="color: var(--color-temperature); font-weight: 600;">24.5°C</h5>
               </div>
            </div>
            <div class="col-md-3">
               <div class="p-3 rounded" style="background-color: var(--color-oxygen-bg);">
                  <small style="color: var(--color-secondary-text);">Avg Oxygen</small>
                  <h5 class="mb-0 mt-1" style="color: var(--color-oxygen); font-weight: 600;">8.1 mg/L</h5>
               </div>
            </div>
         </div>
         <div class="mt-4 p-3 rounded" style="background-color: var(--color-bg); border: 1px solid var(--color-border);">
            <p class="mb-0" style="color: var(--color-secondary-text);"><i class="bi bi-info-circle me-2"></i>This is a preview. Full report functionality will be implemented in the future.</p>
         </div>
      </div>
   `;
}

function exportReport() {
   const preview = document.getElementById('reportPreview');
   if (preview.querySelector('.bi-file-earmark-bar-graph')) {
      alert('Please generate a report first before exporting');
   } else {
      alert('Export functionality coming soon!\n\nThe report will be exported as PDF.');
   }
}
