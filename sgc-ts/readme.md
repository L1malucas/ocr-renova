<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tabela com Cabeçalho Fixo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    
    .table-container {
      max-height: 400px;
      overflow-y: auto;
      overflow-x: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      position: relative;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    thead th {
      position: -webkit-sticky; /* Para Safari */
      position: sticky;
      top: 0;
      background: #2c3e50;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
      z-index: 10;
      border-bottom: 2px solid #34495e;
      box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
    }
    
    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid #ecf0f1;
    }
    
    tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    tbody tr:nth-child(even):hover {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <h2>Tabela com Cabeçalho Fixo</h2>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Cidade</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
        <tr><td>João</td><td>25</td><td>São Paulo</td></tr>
        <tr><td>Maria</td><td>30</td><td>Rio de Janeiro</td></tr>
        <tr><td>Pedro</td><td>28</td><td>Curitiba</td></tr>
        <tr><td>Ana</td><td>32</td><td>Belo Horizonte</td></tr>
        <tr><td>Lucas</td><td>27</td><td>Recife</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>