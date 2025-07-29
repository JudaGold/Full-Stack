console.log("test");

try {
  const response = await fetch("http://localhost:8000/api");
  console.log(response);
  const data = await response.json();
  console.log(data);
} catch (err) {
  console.log(err);
}
