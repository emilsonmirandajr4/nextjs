<?php
/**
 * WordPress Webhook para Next.js Cache Revalidation
 * 
 * INSTRUÇÕES DE INSTALAÇÃO:
 * 
 * 1. Copie TODO este código
 * 2. No WordPress admin, vá em: Aparência → Editor de Temas
 * 3. No menu direito, clique em: "functions.php"
 * 4. Cole este código NO FINAL do arquivo
 * 5. IMPORTANTE: Substitua SEU-SITE-AQUI e SEU-TOKEN-SECRETO
 * 6. Clique em "Atualizar Arquivo"
 * 7. Pronto! ✅
 */

// ============================================
// CONFIGURAÇÃO (EDITE AQUI)
// ============================================

// URL do seu site Next.js na Vercel
define('NEXTJS_SITE_URL', 'https://SEU-SITE-AQUI.vercel.app');

// Token secreto (mesmo valor de WEBHOOK_SECRET do .env.local e Vercel)
define('WEBHOOK_SECRET', 'SEU-TOKEN-SECRETO');

// ============================================
// CÓDIGO DO WEBHOOK (NÃO EDITE ABAIXO)
// ============================================

/**
 * Revalida cache do Next.js quando post é publicado
 */
function revalidate_nextjs_cache_on_publish($new_status, $old_status, $post) {
    // Só executa quando post é publicado
    if ($new_status !== 'publish' || $old_status === 'publish') {
        return;
    }
    
    // Só para posts, não páginas
    if ($post->post_type !== 'post') {
        return;
    }
    
    $url = NEXTJS_SITE_URL . '/api/revalidate';
    $secret = WEBHOOK_SECRET;
    
    // Revalida AMBOS: lista de posts E post individual
    $tags = ['posts-list', 'post-' . $post->post_name];
    
    foreach ($tags as $tag) {
        $body = json_encode([
            'tag' => $tag,
            'postId' => $post->ID,
            'postSlug' => $post->post_name,
        ]);
        
        wp_remote_post($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $secret,
                'Content-Type' => 'application/json',
            ],
            'body' => $body,
            'timeout' => 5,
            'blocking' => false, // Não espera resposta (mais rápido)
        ]);
    }
    
    error_log('✅ [Next.js Webhook] Cache revalidado para post: ' . $post->post_title . ' (tags: ' . implode(', ', $tags) . ')');
}

// Hook para quando post é publicado
add_action('transition_post_status', 'revalidate_nextjs_cache_on_publish', 10, 3);

/**
 * Revalida cache quando post é atualizado (editado)
 */
function revalidate_nextjs_cache_on_update($post_id, $post_after, $post_before) {
    // Só para posts publicados
    if ($post_after->post_status !== 'publish') {
        return;
    }
    
    // Só para posts, não páginas
    if ($post_after->post_type !== 'post') {
        return;
    }
    
    $url = NEXTJS_SITE_URL . '/api/revalidate';
    $secret = WEBHOOK_SECRET;
    
    // Revalida AMBOS: lista de posts E post individual
    $tags = ['posts-list', 'post-' . $post_after->post_name];
    
    foreach ($tags as $tag) {
        $body = json_encode([
            'tag' => $tag,
            'postId' => $post_id,
            'postSlug' => $post_after->post_name,
        ]);
        
        wp_remote_post($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $secret,
                'Content-Type' => 'application/json',
            ],
            'body' => $body,
            'timeout' => 5,
            'blocking' => false,
        ]);
    }
    
    error_log('✅ [Next.js Webhook] Cache revalidado (update) para: ' . $post_after->post_title . ' (tags: ' . implode(', ', $tags) . ')');
}

// Hook para quando post é atualizado
add_action('post_updated', 'revalidate_nextjs_cache_on_update', 10, 3);

/**
 * Adiciona aviso no admin quando webhook está ativo
 */
function nextjs_webhook_admin_notice() {
    $screen = get_current_screen();
    if ($screen->id === 'post' || $screen->id === 'edit-post') {
        echo '<div class="notice notice-success is-dismissible">
            <p><strong>✅ Next.js Webhook Ativo:</strong> O cache será atualizado automaticamente ao publicar posts.</p>
        </div>';
    }
}
add_action('admin_notices', 'nextjs_webhook_admin_notice');

// ============================================
// FIM DO CÓDIGO
// ============================================
// Webhook instalado com sucesso! 🚀
// O cache do Next.js será atualizado automaticamente
// quando você publicar ou editar posts.
?>
