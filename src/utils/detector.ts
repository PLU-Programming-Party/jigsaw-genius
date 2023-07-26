
export default function (outer: any, inner: any) {
    let found = false;

    let outerStartIndex = 0;
    let innerStartIndex = 0;
    function locate() {
        for (let i = 0; i < outer.length; i++) {
            let outerPixelRGB = outer[i];
            for (let j = 0; j < inner.length; j++) {
                let innerPixelRGB = inner[j];
                if (compare(outerPixelRGB, innerPixelRGB)) {
                    found = true;
                    outerStartIndex = i;
                    innerStartIndex = j;
                    break;
                }
            }
        }
    }

    function compare(outerRGB: any, innerRGB: any) {
        let isSame = true;
        for (let i = 0; i < outerRGB.length; i++) {
            if (outerRGB[i] != innerRGB[i]) {
                isSame = false;
            }
        }
        return isSame;
    }

    function rgbValues(startIndex: any) {
        const rgb = [];
        for (let i = startIndex; i < startIndex + inner.length; i++) {
            rgb.push(outer[i]);
        }
        console.log(rgb);
    }

    locate();
    rgbValues(outerStartIndex);
    console.log(inner);



    return found;
}