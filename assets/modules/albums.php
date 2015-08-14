<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/8/9
 * Time: 1:24
 */
define('APP_KEY', 'c9f6d74e4b2fe9f1b74a64ee458a917f');
define('API_SERVER', 'http://api.thekittyplay.com');
$data = '{"action":"sp_get_albums","app_id":20, "app_version":"1.0", "location":"zh_CN", "page":0}' ;
$api_name = "sp_get_albums";
$data = json_decode($data,true);
$out = curl_api($data);
echo json_encode($out);

function curl_api($data) {
    $action = $data['action'];
    unset($data['action']);
    $request = array();
    $request['action'] = $action;
    $request['param'] = json_encode($data);
    $request['sig'] = md5(APP_KEY . time() . trim($request['param']));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, API_SERVER . '/index.php');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    return json_decode($response, true);
}

