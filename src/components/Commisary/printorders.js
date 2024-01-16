// productUtils.js

 const getProductQuantity = (order, productId) => {
  const product = order.products.find((p) => p.ProductId === productId);
  return product.productQuantity !== -1 ? product.productQuantity : "";
};

// printUtils.js


// printUtils.js


export const handlePrint = (orderData) => {
  const printWindow = window.open('', '_blank');

  const printContent = `
    <html>
      <head>
        <title>Print</title>
        <!-- Include Bootstrap stylesheet -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
          @media print {
            .print-only {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <table class="table table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                ${orderData && orderData.storeOrders && orderData.storeOrders.map(order => `<th>${order.storeName}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${orderData && orderData.allproducts && orderData.allproducts.map(product => `
                <tr>
                  <td>${product.productName}</td>
                  <td>${product.ProductId}</td>
                  ${orderData.storeOrders.map(order => `
                    <td>${getProductQuantity(order, product.ProductId)}</td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <!-- Add a button to trigger print -->
        <div class="container mt-4 print-only">
          <button class="btn btn-primary" onclick="window.print()">Print</button>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
};
