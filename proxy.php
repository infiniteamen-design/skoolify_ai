<?php
header('Content-Type: application/json');

$apiKey = 'AIzaSyA80ohbKWxiXOO-VpHGL9xxuH-GEG0aFIU'; // Replace with your key
$input = file_get_contents('php://input');

$ch = curl_init('https://api.google.com/gemini');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $input);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
