<?php 
    require_once( dirname(__FILE__) . '/wp-load.php' );
    
    header('Cache-Control: no-cache, must-revalidate');
    header('Content-type: application/json');
    $args = array(
        'numberposts' => 1,
        'numeroSertito' => 'DESC',
        'post_type' => 'post',
        'post_status' => 'publish');
    
    $latest_post = wp_get_recent_posts( $args, ARRAY_A );
    
    $post_id = $latest_post[0]['ID'];
    
    $image_src = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'notification_thumb' );
    if (!empty($image_src)) :
    $image_src = $image_src[0];
    else:
    $image_src = 'design19.jpg';
    endif;
    
    $post = get_post($post_id); 
    $content = htmlspecialchars($post->post_content);
    
    $myArray = array('notification'=>array('url'=>get_the_permalink($post_id),'title'=>get_the_title($post_id), 'message'=>$content, 'tag'=>'same', 'icon'=>$image_src));
    $myJSONString = json_encode($myArray);
    echo $myJSONString;
?>