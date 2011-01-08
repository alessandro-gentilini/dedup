cscript /nologo create_md5_bat.js %1 %2 > do_md5.bat
@echo off
call do_md5.bat > md5.txt
@echo on
cscript /nologo create_deldup_bat.js md5.txt > delete_duplicates.bat