<?php



$data = array(subsys=>"subsys1",
                        node=>"mb", 
                        request=>"getarchive",
                        authority=>"1252",
                              data=>array(
                                  from=>"2021.12.30 00:00:00", 
                                            to=>"2021.12.30 15:00:00", 
                                             names=>array("Z2B6CURVAL")
                                  )
            );

                                print_r(json_encode($data));

$ch = curl_init('http://169.254.234.252:160/srvcom.php');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Access-Control-Allow-Origin: *'));
curl_setopt($ch, CURLOPT_USERPWD, "Supervisor:1015");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);

$res = curl_exec($ch);
curl_close($ch);
 
$res = json_encode($res, JSON_UNESCAPED_UNICODE);
print_r($res);
