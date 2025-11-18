const adminData = {
   totalDevices: 12,
   activeDevices: 8,
   inactiveDevices: 4,
   
   devices: [
      {
         id: 'Device-01',
         location: 'Main water tank',
         status: 'active',
         lastUpdated: '2023-11-14 07:45 PM'
      },
      {
         id: 'Device-02',
         location: 'Water filter pipe',
         status: 'active',
         lastUpdated: '2023-11-14 07:45 PM'
      },
      {
         id: 'Device-03',
         location: 'Distribution point A',
         status: 'inactive',
         lastUpdated: '2023-11-14 06:30 PM'
      },
      {
         id: 'Device-04',
         location: 'Storage tank B',
         status: 'inactive',
         lastUpdated: '2023-11-14 05:15 PM'
      },
      {
         id: 'Device-05',
         location: 'Monitoring station C',
         status: 'active',
         lastUpdated: '2023-11-14 07:50 PM'
      },
      {
         id: 'Device-06',
         location: 'Treatment plant inlet',
         status: 'active',
         lastUpdated: '2023-11-14 07:42 PM'
      },
      {
         id: 'Device-07',
         location: 'Reservoir East',
         status: 'inactive',
         lastUpdated: '2023-11-14 04:20 PM'
      },
      {
         id: 'Device-08',
         location: 'Distribution point B',
         status: 'active',
         lastUpdated: '2023-11-14 07:48 PM'
      },
      {
         id: 'Device-09',
         location: 'Chlorination station',
         status: 'active',
         lastUpdated: '2023-11-14 07:51 PM'
      },
      {
         id: 'Device-10',
         location: 'Pumping station 1',
         status: 'active',
         lastUpdated: '2023-11-14 07:46 PM'
      },
      {
         id: 'Device-11',
         location: 'Quality control lab',
         status: 'inactive',
         lastUpdated: '2023-11-14 03:10 PM'
      },
      {
         id: 'Device-12',
         location: 'Emergency backup tank',
         status: 'active',
         lastUpdated: '2023-11-14 07:44 PM'
      }
   ]
};

let currentFilter = 'all';
let currentSearch = '';


function displayDashboardStatistics() {
   document.getElementById('totalDevices').textContent = adminData.totalDevices;
   document.getElementById('activeDevices').textContent = adminData.activeDevices;
   document.getElementById('inactiveDevices').textContent = adminData.inactiveDevices;
}

function displayDeviceList(filter = 'all', search = '') {
   const tbody = document.getElementById('deviceTableBody');
   tbody.innerHTML = '';
   
   let filteredDevices = adminData.devices;
   if (filter === 'active') {
      filteredDevices = adminData.devices.filter(d => d.status === 'active');
   } else if (filter === 'inactive') {
      filteredDevices = adminData.devices.filter(d => d.status === 'inactive');
   }
   
   if (search.trim()) {
      const searchLower = search.toLowerCase();
      filteredDevices = filteredDevices.filter(d => 
         d.id.toLowerCase().includes(searchLower) || 
         d.location.toLowerCase().includes(searchLower)
      );
   }
   
   filteredDevices.forEach(device => {
      const row = document.createElement('tr');
      
      const isActive = device.status === 'active';
      const statusBg = isActive ? 'var(--color-success-bg)' : 'var(--color-danger-bg)';
      const statusColor = isActive ? 'var(--color-success)' : 'var(--color-danger)';
      const statusIcon = isActive ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
      const statusText = isActive ? 'Active' : 'Inactive';
      
      row.innerHTML = `
         <td style="color: var(--color-text); font-weight: 500;">${device.id}</td>
         <td style="color: var(--color-secondary-text);">${device.location}</td>
         <td>
            <span class="badge" style="background-color: ${statusBg}; color: ${statusColor}; font-weight: 500; padding: 0.375rem 0.75rem;">
               <i class="bi ${statusIcon} me-1"></i>
               ${statusText}
            </span>
         </td>
         <td style="color: var(--color-muted); font-size: 0.875rem;">${device.lastUpdated}</td>
         <td class="text-end">
            <button class="btn btn-sm me-1" type="button" onclick="editDevice('${device.id}')" style="background-color: transparent; color: var(--color-primary); border: 1px solid var(--color-primary);">
               <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm" type="button" onclick="deleteDevice('${device.id}')" style="background-color: transparent; color: var(--color-danger); border: 1px solid var(--color-danger);">
               <i class="bi bi-trash"></i>
            </button>
         </td>
      `;
      
      tbody.appendChild(row);
   });
   
   if (filteredDevices.length === 0) {
      const row = document.createElement('tr');
      const message = search.trim() ? 'No devices found matching your search' : 'No devices found for this filter';
      row.innerHTML = `
         <td colspan="5" class="text-center" style="color: var(--color-muted); padding: 2rem;">
            <i class="bi bi-inbox" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
            ${message}
         </td>
      `;
      tbody.appendChild(row);
   }
}

function setFilter(filter) {
   currentFilter = filter;
   
   const filterAll = document.getElementById('filterAll');
   const filterActive = document.getElementById('filterActive');
   const filterInactive = document.getElementById('filterInactive');
   
   filterAll.classList.remove('active');
   filterAll.style.backgroundColor = 'transparent';
   filterAll.style.color = 'var(--color-primary)';
   
   filterActive.classList.remove('active');
   filterActive.style.backgroundColor = 'transparent';
   filterActive.style.color = 'var(--color-success)';
   
   filterInactive.classList.remove('active');
   filterInactive.style.backgroundColor = 'transparent';
   filterInactive.style.color = 'var(--color-danger)';
   
   if (filter === 'all') {
      filterAll.classList.add('active');
      filterAll.style.backgroundColor = 'var(--color-primary)';
      filterAll.style.color = 'white';
   } else if (filter === 'active') {
      filterActive.classList.add('active');
      filterActive.style.backgroundColor = 'var(--color-success)';
      filterActive.style.color = 'white';
   } else if (filter === 'inactive') {
      filterInactive.classList.add('active');
      filterInactive.style.backgroundColor = 'var(--color-danger)';
      filterInactive.style.color = 'white';
   }
   
   displayDeviceList(filter, currentSearch);
}

// handle device search
function searchDevices(query) {
   currentSearch = query;
   displayDeviceList(currentFilter, query);
}

// dit device (placeholder)
function editDevice(deviceId) {
   console.log('Edit device:', deviceId);
   alert(`Edit device: ${deviceId}\n(This is a demo - functionality not implemented)`);
}

// add device (placeholder)
function addDevice() {
   console.log('Add new device');
   alert('Add New Device\n\n(This is a demo - functionality not implemented)');
}

// delete device (placeholder)
function deleteDevice(deviceId) {
   const confirmed = confirm(`Are you sure you want to delete ${deviceId}?`);
   if (confirmed) {
      console.log('Delete device:', deviceId);
      const index = adminData.devices.findIndex(d => d.id === deviceId);
      if (index !== -1) {
         const device = adminData.devices[index];
         adminData.devices.splice(index, 1);
         
         adminData.totalDevices--;
         if (device.status === 'active') {
            adminData.activeDevices--;
         } else {
            adminData.inactiveDevices--;
         }
         
         displayDashboardStatistics();
         displayDeviceList(currentFilter);
      }
   }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
   displayDashboardStatistics();
   displayDeviceList();
   
   const deviceSearch = document.getElementById('deviceSearch');
   if (deviceSearch) {
      deviceSearch.addEventListener('input', function(e) {
         searchDevices(e.target.value);
      });
   }
});

