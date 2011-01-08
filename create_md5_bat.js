var path = WScript.Arguments(0);
var min_size = WScript.Arguments(1);

var fso = new ActiveXObject("Scripting.FileSystemObject");
var sizes = new ActiveXObject("Scripting.Dictionary");

function process_file( file )
{
 var sz = file.size;
 if ( sz < min_size ) return;
 if ( sizes.Exists( sz ) ) {
  sizes.Item( sz ).push( file );
 } else {
  sizes.Item( sz ) = new Array;
  sizes.Item( sz ).push( file );
 }
}

function walk( fso, folder_path, action )
{
   var folder = fso.GetFolder( folder_path )
   for( var it = new Enumerator( folder.files ); 
            !it.atEnd(); 
             it.moveNext() ) {
      action( it.item() );
   }
   
   for( var it = new Enumerator( folder.SubFolders ); 
            !it.atEnd(); 
             it.moveNext() ) {
      WScript.StdErr.WriteLine( "Walking through " + it.item() );
      walk( fso, it.item(), action );
   }   
}

walk( fso, path, process_file );


var keys = (new VBArray(sizes.Keys())).toArray(); 

var total = 0;
for ( var i = 0; i < keys.length; i++ ) {
 if ( sizes.Item(keys[i]).length > 1 ) {
  //WScript.Echo( keys[i] );
  var sz = sizes.Item(keys[i]).length;
  for ( var j = 0; j < sz; j++ ) {
   total++;
  }
 }
}

WScript.Echo( "cscript /nologo write2stderr.js \"Totale=" + total + "\"" );

var cnt = 0;
for ( var i = 0; i < keys.length; i++ ) {
 if ( sizes.Item(keys[i]).length > 1 ) {
  WScript.Echo( "rem " + keys[i] );
  var sz = sizes.Item(keys[i]).length;
  for ( var j = 0; j < sz; j++ ) {
   WScript.Echo( "md5.exe \"" + sizes.Item(keys[i])[j] + "\"" );
   cnt++
   if ( cnt && cnt%10 == 0 ) {
    WScript.Echo( "cscript /nologo write2stderr.js \"" + cnt + "/" + total + "\"" );
   }
  }
 }
}

