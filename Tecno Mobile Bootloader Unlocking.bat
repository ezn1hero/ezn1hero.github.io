@echo off

echo Bootloader Unlocking By Easy Team


echo.
echo Once your device is on the FASTBOOT screen, continue
pause
cls
echo Starting Bootloader Unlocking process!
echo.
echo Booting device...
fastboot flashing unlock
echo.
echo Restarting...
fastboot reboot
echo.
adb reboot
echo.
echo Bootloader Unlocking complete! Enjoy!
pause
