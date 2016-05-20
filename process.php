<?php
  require_once('wufoo/WufooApiWrapper.php');

  $api_key      = 'PKP0-XK25-EIZD-MWKZ';
  $form_hash    = 'z1ow4dfd08m61sb';
  $wufoo_id     = 'resanoma';  
  $api        = new WufooApiWrapper($api_key, $wufoo_id);
  
  $data_fname      = $_POST['contact_fname'];
  $data_lname      = $_POST['contact_lname'];
  $data_email     = $_POST['contact_email'];

  $postArray  = array(
    new WufooSubmitField('Field1', $data_fname),
    new WufooSubmitField('Field2', $data_lname),
    new WufooSubmitField('Field3', $data_email)
  );
  
  $response   = $api->entryPost($form_hash, $postArray);
  
  header('Content-Type: application/json');
  exit(json_encode($response));
?>