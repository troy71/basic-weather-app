<?php
header("Content-Type: application/json");

$apiKey = "629dc4724c6e8bdf1b2d3d4695a61fc7";
$city = $_GET["city"] ?? "";

if (!$city) {
    http_response_code(400);
    echo json_encode(["error" => "No city provided"]);
    exit;
}

$encodedCity = rawurlencode($city);
$url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q={$encodedCity}&appid={$apiKey}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "cURL request failed", "details" => $curlError]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo $response;
    exit;
}

echo $response;

