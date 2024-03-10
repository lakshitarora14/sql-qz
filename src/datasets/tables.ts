export const TABLES = [
  {
    name: 'Customers',
    isTable: 'true',
    items: [
      {
        name: 'customerID',
        isTable: 'false'
      },
      {
        name: 'companyName',
        isTable: 'false'
      },
      {
        name: 'contactTitle',
        isTable: 'false'
      },
      {
        name: 'address',
        isTable: 'false'
      },
      {
        name: 'city',
        isTable: 'false'
      },
      {
        name: 'region',
        isTable: 'false'
      },
      {
        name: 'postalCode',
        isTable: 'false'
      },
      {
        name: 'country',
        isTable: 'false'
      },
      {
        name: 'phone',
        isTable: 'false'
      },
      {
        name: 'fax',
        isTable: 'false'
      }
    ]
  },
  {
    name: 'Category',
    isTable: 'true',
    items: [
      {
        name: 'categoryID',
        isTable: 'false'
      },
      {
        name: 'categoryName',
        isTable: 'false'
      },
      {
        name: 'description',
        isTable: 'false'
      },
      {
        name: 'picture',
        isTable: 'false'
      }
    ]
  },
  {
    name: 'Employee',
    isTable: 'true',
    items: [
      {
        name: 'employeeID',
        isTable: 'false'
      },
      {
        name: 'lastName',
        isTable: 'false'
      },
      {
        name: 'firstName',
        isTable: 'false'
      },
      {
        name: 'title',
        isTable: 'false'
      },
      {
        name: 'titleOfCourtesy',
        isTable: 'false'
      },
      {
        name: 'birthDate',
        isTable: 'false'
      },
      {
        name: 'hireDate',
        isTable: 'false'
      },
      {
        name: 'address',
        isTable: 'false'
      },
      {
        name: 'city',
        isTable: 'false'
      },
      {
        name: 'region',
        isTable: 'false'
      },
      {
        name: 'postalCode',
        isTable: 'false'
      },
      {
        name: 'country',
        isTable: 'false'
      },
      {
        name: 'homePhone',
        isTable: 'false'
      },
      {
        name: 'extension',
        isTable: 'false'
      },
      {
        name: 'photo',
        isTable: 'false'
      },
      {
        name: 'notes',
        isTable: 'false'
      },
      {
        name: 'reportsTo',
        isTable: 'false'
      },
      {
        name: 'photoPath',
        isTable: 'false'
      }
    ]
  },
  {
    name: 'Order Details',
    isTable: 'true',
    items: [
      {
        name: 'orderID',
        isTable: 'false'
      },
      {
        name: 'productID',
        isTable: 'false'
      },
      {
        name: 'unitPrice',
        isTable: 'false'
      },
      {
        name: 'quantity',
        isTable: 'false'
      },
      {
        name: 'discount',
        isTable: 'false'
      }
    ]
  },
  {
    name: 'Orders',
    isTable: 'true',
    items: [
      {
        name: 'orderID',
        isTable: 'false'
      },
      {
        name: 'customerID',
        isTable: 'false'
      },
      {
        name: 'employeeID',
        isTable: 'false'
      },
      {
        name: 'orderDate',
        isTable: 'false'
      },
      {
        name: 'requiredDate',
        isTable: 'false'
      },
      {
        name: 'shippedDate',
        isTable: 'false'
      },
      {
        name: 'shipVia',
        isTable: 'false'
      },
      {
        name: 'freight',
        isTable: 'false'
      },
      {
        name: 'shipName',
        isTable: 'false'
      },
      {
        name: 'shipAddress',
        isTable: 'false'
      },
      {
        name: 'shipCity',
        isTable: 'false'
      },
      {
        name: 'shipRegion',
        isTable: 'false'
      },
      {
        name: 'shipPostalCode',
        isTable: 'false'
      },
      {
        name: 'shipCountry',
        isTable: 'false'
      }
    ]
  },
  {
    name: 'Products',
    isTable: 'true',
    items: [
      {
        name: 'productID',
        isTable: 'false'
      },
      {
        name: 'productName',
        isTable: 'false'
      },
      {
        name: 'supplierID',
        isTable: 'false'
      },
      {
        name: 'categoryID',
        isTable: 'false'
      },
      {
        name: 'quantityPerUnit',
        isTable: 'false'
      },
      {
        name: 'unitPrice',
        isTable: 'false'
      },
      {
        name: 'unitsInStock',
        isTable: 'false'
      },
      {
        name: 'unitsOnOrder',
        isTable: 'false'
      },
      {
        name: 'reorderLevel',
        isTable: 'false'
      },
      {
        name: 'discontinued',
        isTable: 'false'
      }
    ]
  }
]
