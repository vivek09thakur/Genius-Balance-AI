async function uploadCSV() {
  const inputElement = document.getElementById("csvInput");
  const file = inputElement.files[0];

  const response = await fetch("https://genius-balance-ai.vercel.app/loader", {
    method: "POST",
    body: new FormData(),
  });

  // Clear previous responses
  document.getElementById("response").innerHTML = "";

  if (!response.ok) {
    const text = await response.text();
    console.log(`Error ${response.status}: ${text}`);
    document.getElementById("response").innerText += `${text}\n`;
    return;
  }

  const reader = file.stream().getReader();
  const blob = await readStreamAsArrayBuffer(reader, file.size);
  const arrayBufferView = new Uint8Array(blob);
  const decoder = new TextDecoder("utf-8");
  const csvContent = decoder.decode(arrayBufferView);

  const formData = new FormData();
  formData.append("csv_data", new Blob([csvContent], { type: "text/csv" }));

  const finalResponse = await fetch(
    "https://genius-balance-ai.vercel.app/loader",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await finalResponse.json();

  if ("error" in result) {
    console.log(`Error: ${result.error}`);
    document.getElementById("response").innerText += `${result.error}\n`;
  } else {
    document.getElementById("response").innerText +=
      JSON.stringify(result.data, null, 2) + "\n";
  }
}

async function readStreamAsArrayBuffer(stream, length) {
  const chunks = [];
  let bytesReceived = 0;
  while (bytesReceived < length) {
    const result = await stream.read();
    if (result.done) break;
    chunks.push(result.value);
    bytesReceived += result.value.length;
  }
  const resultBlob = new Blob(chunks, { type: "application/octet-stream" });
  return await resultBlob.arrayBuffer();
}
