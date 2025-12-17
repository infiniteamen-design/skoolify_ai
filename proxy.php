<?php
header('Content-Type: application/json');

// 1. Use the correct API Key
$apiKey = 'AIzaSyA80ohbKWxiXOO-VpHGL9xxuH-GEG0aFIU'; 

// 2. Use the official Google AI Studio endpoint
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

$input = file_get_contents('php://input');
$decodedInput = json_decode($input, true);

// 3. Reformat the request to match Gemini's expected JSON structure
$geminiRequest = [
    "contents" => [
        [
            "parts" => [
                ["text" => $decodedInput['query']]
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
curl_close($ch);

echo $response;
?>
