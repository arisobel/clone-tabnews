test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.dependencies.database.ver).toBeDefined();
  expect(responseBody.dependencies.database.oppened_conections).toBeDefined();
  expect(responseBody.dependencies.database.max_conns).toBeDefined();
  
  new Date(responseBody.updated_at).toISOString();
  
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  
  
  
  //verificando tipo de dados e ddados de ver (versao)
  const dbVer = responseBody.dependencies.database.ver;
  expect(typeof dbVer).toBe("string");
  expect(dbVer).toBe("16.0");
  
  //verificando tipo de dados e dados de max_cons (quantidade de conexoes usadas)
  const dbConn = parseInt(responseBody.dependencies.database.oppened_conections, 10);
  //expect(typeof dbConn).toBe("number");
  expect(dbConn).toBe(1);
  
  //verificando tipo de dados e dados de conections (quantidade de conexoes possiveis)
  const dbMaxCons = responseBody.dependencies.database.max_conns
  //expect(typeof dbMaxCons).toBe("number");
  expect(dbMaxCons).toBe(100);

  const dbOpenCons = responseBody.dependencies.database.oppened_conections
  expect(dbOpenCons).toEqual(1);

});
