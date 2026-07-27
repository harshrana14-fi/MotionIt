async function test() {
  const apiKey = "amF0b2xpeWFoYXJzaDhAZ21haWwuY29t:x3andlBn3BuTBV3dAFG2l";
  const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;
  
  console.log("Raw Key:", apiKey);
  console.log("Auth Header:", authHeader);

  const res = await fetch("https://api.d-id.com/credits", {
    headers: {
      "Authorization": authHeader
    }
  });

  console.log("Status:", res.status);
  const data = await res.json();
  console.log(data);
}
test();
