var file = WScript.Arguments(0);
var ForReading = 1;
var fso = new ActiveXObject("Scripting.FileSystemObject");
var f = fso.OpenTextFile(file, ForReading);

var hashes = new ActiveXObject("Scripting.Dictionary");

while ( !f.AtEndOfStream )
{
   var l = f.ReadLine();
   var h_sz = "76E8DE8F8D43FA557B7CEE8FF74081F4".length;
   var h = l.substr( 0, h_sz );
   var n = l.substr( h_sz+2, l.length  );
   if ( hashes.Exists( h ) ) {
      hashes.Item( h ).push( n );
   } else {
      hashes.Item( h ) = new Array;
      hashes.Item( h ).push( n );
   }
}

var keys = (new VBArray(hashes.Keys())).toArray(); 
for ( var i = 0; i < keys.length; i++ ) {
   if ( hashes.Item(keys[i]).length > 1) {
      for ( var j = 0; j < hashes.Item(keys[i]).length; j++ ) {
         if ( j == 0 ) {
            WScript.Echo( "rem keep " + hashes.Item(keys[i])[j] );
         } else {
            WScript.Echo( "del \"" + hashes.Item(keys[i])[j] + "\"" );
         }
      }
      WScript.Echo();
   }
}