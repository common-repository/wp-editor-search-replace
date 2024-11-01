(function() {
    tinymce.PluginManager.add( 'wp_editor_search_button', function( editor, url ) {
        // Add Button to Visual Editor Toolbar
        editor.addButton('wp_editor_search_button', {
            title: 'Search & Replace',
            cmd: 'wp_editor_search_button',
            icon: 'icon dashicons-search',
        });
 
        editor.addCommand('wp_editor_search_button', function() {
            var search = prompt('Find:');

            if( !search)
                return;


            var replace = prompt('Replace:');

            var pattern = new RegExp(search,"gi");

            if(  !replace)
                return;


            var text = editor.getContent({
                'format': 'html'
            });
            var findCount = (text.match(pattern) || []).length;

            if(findCount == 0){
                return;
            }
            if(confirm(findCount + " matches found, replace now?")){
                editor.setContent(text.replace(pattern, replace));    
            }
        });
        editor.onNodeChange.add(function( editor ) {
             editor.controlManager.setDisabled( 'wp_editor_search_button', false );
        });
    });
})();