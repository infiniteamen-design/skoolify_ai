<?php
header('Content-Type: application/json');

// 1. YOUR API KEY
$apiKey = 'AIzaSyA80ohbKWxiXOO-VpHGL9xxuH-GEG0aFIU'; 

// 2. THE CORRECT URL (v1beta for Gemini 1.5 Flash)
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

// 3. GET DATA FROM YOUR JAVASCRIPT
$input = file_get_contents('php://input');
$decodedInput = json_decode($input, true);
$userQuery = isset($decodedInput['query']) ? $decodedInput['query'] : 'Hello';

// 4. FORMAT THE DATA FOR GOOGLE
$geminiRequest = [
    "contents" => [
        [
            "parts" => [
                ["text" => $userQuery]
            ]
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($geminiRequest));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Curl error: ' . curl_error($ch)]);
} elseif ($httpCode !== 200) {
    // This tells you if the API key is wrong or if you are out of credits
    echo json_encode(['error' => 'Google API Error', 'code' => $httpCode, 'details' => json_decode($response)]);
} else {
    echo $response;
}

curl_close($ch);
?>
