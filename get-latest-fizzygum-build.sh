
# see https://stackoverflow.com/a/5920355
file=../Fizzygum-builds/latest/js/pre-compiled.js
minimumsize=2000
actualsize=$(wc -c <"$file")
echo size of precompiled is $actualsize bytes
if [ $actualsize -le $minimumsize ]; then
    echo there is no precompiled file in the build so cannot let you put it on website
    exit 0
fi

rm -rf ./sandboxes/latest-stable/

cp -r ../Fizzygum-builds/latest ./sandboxes/latest-stable/

rm -rf ./sandboxes/latest-stable/worldWithSystemTestHarness.html

rm -rf ./sandboxes/latest-stable/js/tests/assets
rm -rf ./sandboxes/latest-stable/js/tests/SystemTest_*

rm -rf ./sandboxes/latest-stable/icons/doubleClickLeft.png
rm -rf ./sandboxes/latest-stable/icons/doubleClickRight.png
rm -rf ./sandboxes/latest-stable/icons/leftButtonPressed.png
rm -rf ./sandboxes/latest-stable/icons/middleButtonPressed.png
rm -rf ./sandboxes/latest-stable/icons/rightButtonPressed.png
rm -rf ./sandboxes/latest-stable/icons/scrollDown.png
rm -rf ./sandboxes/latest-stable/icons/scrollUp.png
rm -rf ./sandboxes/latest-stable/icons/xPointerImage.png

