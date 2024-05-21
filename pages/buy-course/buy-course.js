import { getCourseData , registerToCourse } from "../../services/courses.js";
import { getUserToken , getUrlParam, showTimerSwal } from "../../shared/utils.js";

const mainSection = document.querySelector('main')

const registerToFreeCourse = async (courseId) => {
    const response = await registerToCourse(courseId, 0)
    console.log(response);
    if (response.res.ok) {
        location.reload()
    }else{
        showTimerSwal('error','مشکلی پیش آمد!', 'باشه', () => {})
    }

}

const registerToNotFreeCourse = () => {
    showTimerSwal('warning', 'هنوز درگاه پرداخت اضافه نشده است. میتوانید در دوره های رایگان ثبت نام کنید.', 'متوجه هستم.', () => {})  
}

window.registerToFreeCourse = registerToFreeCourse
window.registerToNotFreeCourse = registerToNotFreeCourse

window.addEventListener('load', async () => {
    const courseShortName = getUrlParam('short-name')
    const userToken = getUserToken()
    const courseData = await getCourseData(courseShortName, userToken)
    
    console.log(courseData);

    if(!courseData.data.isUserRegisteredToThisCourse){
        mainSection.insertAdjacentHTML('beforeend', `

            <a href="/" class="logo-wrapper">
                <svg class="logo-icon" viewBox="0 0 1500 636" fill="none"><g clip-path="url(#clip0_348_9)"><g clip-path="url(#clip1_348_9)"><g clip-path="url(#clip2_348_9)"><g clip-path="url(#clip3_348_9)"><g clip-path="url(#clip4_348_9)"><g clip-path="url(#clip5_348_9)"><path d="M11.9303 632.883C7.98306 632.883 5.24191 631.128 3.70686 627.62C2.17182 624.111 1.4043 619.396 1.4043 613.475C1.4043 609.089 1.73324 604.155 2.39111 598.673L23.4431 407.56C31.7762 406.464 40.7014 405.477 50.2187 404.6C59.7798 403.722 70.5909 403.284 82.652 403.284C105.239 403.284 123.068 405.477 136.137 409.863C149.163 414.248 158.483 420.279 164.097 427.954C169.667 435.629 172.452 444.401 172.452 454.269C172.452 466.33 168.834 477.119 161.597 486.637C154.36 496.198 144.931 504.049 133.308 510.189L123.111 515.781C117.19 518.631 111.927 521 107.322 522.886C102.717 524.728 98.7699 525.649 95.4806 525.649C89.3404 525.649 84.0335 523.938 79.56 520.517C75.0426 517.14 72.7838 513.807 72.7838 510.518C72.7838 508.983 73.2882 507.82 74.297 507.031C75.2618 506.285 76.6215 505.693 78.3758 505.255C85.1738 503.281 91.7526 500.364 98.1121 496.505C104.472 492.689 109.691 487.645 113.77 481.374C117.804 475.146 119.822 467.427 119.822 458.217C119.822 447.252 115.436 439.796 106.664 435.849C97.8928 431.901 86.7089 429.928 73.1128 429.928L57.6527 577.95C57.4334 580.143 57.2799 582.27 57.1922 584.331C57.0606 586.437 56.9948 588.586 56.9948 590.779C56.9948 593.191 57.0606 595.099 57.1922 596.502C57.2799 597.949 57.4334 599.879 57.6527 602.291C77.8276 602.291 93.7262 598.563 105.349 591.107C116.971 583.652 122.782 571.59 122.782 554.924C122.782 545.714 120.546 537.929 116.072 531.57C111.555 525.21 106.993 520.386 102.388 517.096L126.401 504.268C136.269 506.899 145.216 510.912 153.242 516.307C161.224 521.658 167.584 528.061 172.32 535.517C177.013 542.973 179.36 551.087 179.36 559.858C179.36 573.893 175.961 586.173 169.163 596.699C162.365 607.225 151.685 615.449 137.124 621.37C122.519 627.291 103.594 630.251 80.3494 630.251C75.9636 630.251 70.4374 630.361 63.7709 630.58C57.0606 630.799 50.1968 631.128 43.1794 631.567C36.1621 632.005 29.8026 632.334 24.101 632.554C18.3994 632.773 14.3425 632.883 11.9303 632.883ZM249.095 634.856H220.477C212.582 634.856 207.319 632.817 204.688 628.738C202.056 624.703 200.85 618.738 201.07 610.844C201.289 603.388 201.881 594.506 202.846 584.2C203.855 573.893 205.017 563.696 206.333 553.609L217.846 467.098C218.942 458.765 218.723 451.747 217.188 446.046C215.653 440.344 213.942 435.235 212.056 430.717C210.214 426.244 209.293 421.924 209.293 417.757C209.293 414.468 211.376 411.551 215.543 409.007C219.709 406.507 224.797 404.49 230.806 402.955C236.858 401.42 242.626 400.652 248.108 400.652C256.441 400.652 262.406 403.174 266.002 408.218C269.642 413.262 271.462 418.963 271.462 425.323C271.462 428.612 271.243 433.765 270.805 440.783C270.366 447.8 269.489 455.804 268.173 464.795L257.647 540.451C255.454 556.24 253.744 572.358 252.516 588.805C251.331 605.252 250.191 620.602 249.095 634.856ZM325.671 634.527C317.119 634.527 309.685 632.049 303.369 627.093C296.966 622.181 293.764 614.352 293.764 603.607C293.764 600.318 293.83 597.248 293.962 594.397C294.093 591.546 294.422 588.037 294.949 583.871C295.519 579.704 296.22 574.003 297.054 566.766L309.553 468.743H339.158C342.886 468.743 346.46 470.87 349.881 475.124C353.302 479.422 355.013 484.641 355.013 490.781C355.013 495.386 354.662 501.417 353.96 508.873C353.302 516.329 352.337 524.552 351.065 533.543L346.789 562.161C345.868 568.301 345.188 573.169 344.75 576.766C344.311 580.406 344.092 583.761 344.092 586.831C344.092 589.024 344.377 591.042 344.947 592.884C345.473 594.77 346.723 595.713 348.697 595.713C351.372 595.713 354.837 593.52 359.091 589.134C363.346 584.748 367.841 578.937 372.578 571.7C377.315 564.463 381.744 556.613 385.867 548.148C390.077 539.727 393.498 531.46 396.13 523.346C398.718 515.232 400.011 508.105 400.011 501.965C400.011 496.922 399.419 492.689 398.235 489.268C397.007 485.891 396.503 483.106 396.722 480.913C396.722 478.94 398.498 477.185 402.051 475.65C405.559 474.115 409.77 472.843 414.682 471.835C419.638 470.87 424.419 470.102 429.024 469.532C433.585 469.006 436.962 468.743 439.155 468.743C443.76 468.743 447.444 470.935 450.207 475.321C452.926 479.707 453.848 485.957 452.97 494.071L437.51 633.54H410.603C407.709 633.54 405.077 632.378 402.709 630.054C400.296 627.773 398.301 624.988 396.722 621.699C395.231 618.409 394.485 615.23 394.485 612.159C394.485 607.116 395.362 601.633 397.117 595.713C398.827 589.792 401.174 582.226 404.156 573.016C407.138 563.806 410.581 551.964 414.485 537.491V543.083C405.932 565.45 396.854 583.323 387.249 596.699C377.556 610.076 367.556 619.725 357.249 625.646C346.987 631.567 336.461 634.527 325.671 634.527ZM531.258 635.514C514.372 635.514 500.513 630.185 489.68 619.528C478.803 608.914 473.365 594.287 473.365 575.647C473.365 560.078 475.777 545.824 480.601 532.885C485.426 519.947 492.18 508.654 500.864 499.005C509.504 489.356 519.482 481.9 530.797 476.637C542.069 471.374 554.064 468.743 566.783 468.743C580.818 468.743 592.659 471.966 602.308 478.413C611.957 484.904 616.781 494.29 616.781 506.57C616.781 518.412 612.352 528.829 603.492 537.819C594.589 546.81 582.243 554.53 566.454 560.977C550.665 567.468 532.354 572.906 511.521 577.292L507.245 554.266C517.771 552.951 527.486 550.473 536.389 546.832C545.248 543.236 552.529 538.477 558.231 532.556C563.932 526.636 567.002 519.838 567.441 512.162C567.879 506.899 567.112 502.448 565.138 498.807C563.165 495.211 560.204 493.413 556.257 493.413C551.432 493.413 546.564 496.593 541.652 502.952C536.696 509.312 532.573 517.754 529.284 528.28C525.995 538.806 524.35 550.209 524.35 562.49C524.35 573.674 525.666 582.599 528.297 589.265C530.929 595.976 536.74 599.331 545.731 599.331C554.722 599.331 563.45 597.511 571.914 593.871C580.335 590.274 587.287 586.722 592.769 583.213C594.523 582.116 596.278 581.064 598.032 580.055C599.786 579.09 601.321 578.608 602.637 578.608C604.172 578.608 605.378 579.2 606.255 580.384C607.133 581.612 607.571 583.103 607.571 584.858C607.571 588.805 605.927 593.629 602.637 599.331C599.348 605.032 594.48 610.624 588.032 616.107C581.541 621.589 573.581 626.194 564.151 629.922C554.722 633.65 543.757 635.514 531.258 635.514ZM712.173 634.198C708.226 634.198 705.2 631.786 703.095 626.962C701.033 622.137 700.003 616.765 700.003 610.844C700.003 602.291 700.99 588.366 702.963 569.069L720.726 401.639L753.62 401.31C762.611 401.091 768.246 403.174 770.527 407.56C772.852 411.946 773.246 421.047 771.711 434.862L756.58 572.358C756.142 576.963 755.966 581.722 756.054 586.634C756.185 591.59 756.58 596.37 757.238 600.976L819.407 586.831C823.355 585.954 827.346 585.011 831.381 584.002C835.46 583.037 838.266 582.555 839.802 582.555C843.529 582.555 845.393 585.516 845.393 591.436C845.393 595.384 844.341 600.427 842.236 606.568C840.174 612.708 837.323 618.19 833.683 623.014C830.087 627.839 825.876 630.251 821.052 630.251H806.25C789.803 630.251 775.22 630.58 762.501 631.238C749.782 631.896 739.19 632.554 730.726 633.212C722.305 633.869 716.121 634.198 712.173 634.198ZM910.852 635.514C893.967 635.514 880.085 630.185 869.209 619.528C858.376 608.914 852.959 594.287 852.959 575.647C852.959 560.078 855.371 545.824 860.196 532.885C865.02 519.947 871.752 508.654 880.392 499.005C889.076 489.356 899.054 481.9 910.326 476.637C921.641 471.374 933.658 468.743 946.377 468.743C960.412 468.743 972.254 471.966 981.903 478.413C991.552 484.904 996.376 494.29 996.376 506.57C996.376 518.412 991.924 528.829 983.021 537.819C974.162 546.81 961.837 554.53 946.048 560.977C930.259 567.468 911.948 572.906 891.116 577.292L886.84 554.266C897.366 552.951 907.058 550.473 915.918 546.832C924.821 543.236 932.123 538.477 937.825 532.556C943.527 526.636 946.597 519.838 947.035 512.162C947.474 506.899 946.706 502.448 944.733 498.807C942.759 495.211 939.799 493.413 935.851 493.413C931.027 493.413 926.137 496.593 921.181 502.952C916.269 509.312 912.168 517.754 908.878 528.28C905.589 538.806 903.944 550.209 903.944 562.49C903.944 573.674 905.26 582.599 907.892 589.265C910.523 595.976 916.334 599.331 925.325 599.331C934.316 599.331 943.022 597.511 951.443 593.871C959.908 590.274 966.881 586.722 972.363 583.213C974.118 582.116 975.872 581.064 977.627 580.055C979.381 579.09 980.916 578.608 982.232 578.608C983.767 578.608 984.973 579.2 985.85 580.384C986.727 581.612 987.166 583.103 987.166 584.858C987.166 588.805 985.521 593.629 982.232 599.331C978.942 605.032 974.052 610.624 967.561 616.107C961.114 621.589 953.175 626.194 943.746 629.922C934.316 633.65 923.352 635.514 910.852 635.514ZM1045.32 635.514C1033.04 635.514 1023.46 630.405 1016.57 620.186C1009.64 610.01 1006.18 596.151 1006.18 578.608C1006.18 562.599 1008.77 547.907 1013.94 534.53C1019.07 521.153 1026.09 509.575 1034.99 499.794C1043.85 490.058 1053.87 482.492 1065.06 477.098C1076.24 471.747 1087.86 469.071 1099.93 469.071C1109.36 469.071 1117.97 470.321 1125.78 472.821C1133.54 475.365 1140.17 477.953 1145.65 480.584L1136.11 524.662C1130.41 520.715 1124.05 516.592 1117.03 512.294C1110.01 508.04 1103.22 504.421 1096.64 501.439C1090.06 498.5 1084.47 497.031 1079.86 497.031C1075.47 497.031 1071.37 500.54 1067.56 507.557C1063.7 514.575 1060.63 523.39 1058.35 534.004C1056.02 544.661 1054.86 555.582 1054.86 566.766C1054.86 576.415 1055.41 584.463 1056.51 590.91C1057.6 597.401 1059.58 600.647 1062.43 600.647C1064.84 600.647 1068.96 597.73 1074.79 591.897C1080.58 586.108 1087.86 575.976 1096.64 561.503C1105.41 547.03 1115.17 526.855 1125.91 500.978L1138.74 532.556C1126.9 558.872 1115.61 579.529 1104.86 594.528C1094.11 609.572 1083.87 620.164 1074.14 626.304C1064.36 632.444 1054.75 635.514 1045.32 635.514ZM1153.54 633.54H1129.2C1122.18 633.54 1117.47 632.005 1115.06 628.935C1112.64 625.865 1111.44 621.918 1111.44 617.094C1111.44 613.366 1111.94 608.475 1112.95 602.423C1113.92 596.414 1115.17 589.901 1116.7 582.884C1118.24 575.867 1119.88 569.288 1121.64 563.148L1128.87 538.477L1117.69 529.925L1125.58 480.255C1132.6 479.159 1139.35 477.733 1145.85 475.979C1152.29 474.225 1158.04 472.69 1163.08 471.374C1168.13 470.058 1171.85 469.4 1174.27 469.4C1178.43 469.4 1180.52 471.593 1180.52 475.979C1180.52 477.953 1179.16 482.777 1176.44 490.452C1173.67 498.128 1170.76 507.842 1167.69 519.596C1164.62 531.307 1162.31 544.398 1160.78 558.872L1153.54 633.54ZM1246.63 619.725L1234.13 572.687C1242.25 551.635 1250.47 533.39 1258.8 517.952C1267.14 502.47 1275.69 490.452 1284.46 481.9C1293.23 473.348 1302.11 469.071 1311.1 469.071C1316.81 469.071 1321.59 470.607 1325.45 473.677C1329.26 476.747 1331.17 482.119 1331.17 489.795C1331.17 494.838 1330.51 499.882 1329.2 504.926C1327.88 509.969 1326.02 514.136 1323.6 517.425C1321.19 520.715 1318.34 522.359 1315.05 522.359C1312.2 522.359 1308.76 521.307 1304.72 519.202C1300.64 517.14 1296.08 516.11 1291.04 516.11C1287.75 516.11 1283.98 518.675 1279.72 523.807C1275.43 528.982 1271.04 536.175 1266.57 545.385C1262.05 554.595 1258.04 565.494 1254.53 578.082C1251.02 590.713 1248.39 604.594 1246.63 619.725ZM1205.51 634.856C1202.66 634.856 1200.43 634.374 1198.8 633.409C1197.14 632.4 1196.15 629.812 1195.84 625.646C1195.49 621.479 1195.87 614.791 1196.96 605.581L1212.42 468.743H1244.66C1250.58 468.743 1254.81 471.155 1257.36 475.979C1259.86 480.804 1261.11 486.286 1261.11 492.426C1261.11 495.277 1259.96 499.707 1257.68 505.715C1255.36 511.768 1252.84 518.127 1250.12 524.794C1247.36 531.504 1245.21 537.381 1243.67 542.425L1235.78 569.398L1252.22 567.424L1246.63 619.725C1246.41 622.795 1244.44 625.317 1240.71 627.291C1236.98 629.264 1232.6 630.799 1227.55 631.896C1222.51 632.992 1217.9 633.76 1213.74 634.198C1209.57 634.637 1206.83 634.856 1205.51 634.856ZM1479.19 633.54H1446.96C1443.45 633.54 1440.82 631.94 1439.06 628.738C1437.31 625.58 1436.1 622.137 1435.44 618.409C1434.78 614.681 1434.46 611.831 1434.46 609.857C1434.46 606.787 1434.67 603.278 1435.11 599.331C1435.55 595.384 1436.03 591.217 1436.56 586.831C1437.13 582.445 1437.74 578.279 1438.4 574.332L1443.99 540.122C1444.65 535.736 1445.46 531.175 1446.43 526.438C1447.44 521.745 1447.94 517.974 1447.94 515.123C1447.94 512.711 1447.39 510.956 1446.3 509.86C1445.2 508.763 1443.89 508.215 1442.35 508.215C1439.5 508.215 1435.22 510.847 1429.52 516.11C1423.82 521.373 1417.79 528.938 1411.43 538.806C1405.07 548.674 1399.3 560.45 1394.13 574.134C1389 587.862 1385.55 603.059 1383.8 619.725L1370.97 569.398C1377.55 550.319 1385.01 534.355 1393.34 521.504C1401.67 508.698 1410.27 498.457 1419.13 490.781C1428.03 483.106 1436.58 477.558 1444.78 474.137C1453.03 470.76 1460.33 469.071 1466.69 469.071C1474.59 469.071 1480.88 470.541 1485.57 473.479C1490.31 476.462 1493.66 480.255 1495.64 484.86C1497.61 489.466 1498.6 494.071 1498.6 498.676C1498.6 504.597 1498.2 509.969 1497.41 514.794C1496.67 519.618 1495.86 524.881 1494.98 530.583L1479.19 633.54ZM1342.68 634.856C1339.83 634.856 1337.57 634.374 1335.91 633.409C1334.28 632.4 1333.3 629.812 1332.95 625.646C1332.64 621.479 1333.03 614.791 1334.13 605.581L1349.59 468.743H1381.83C1387.75 468.743 1391.96 471.155 1394.46 475.979C1397 480.804 1398.27 486.286 1398.27 492.426C1398.27 495.277 1397.07 499.707 1394.65 505.715C1392.24 511.768 1389.54 518.127 1386.56 524.794C1383.62 531.504 1381.28 537.381 1379.52 542.425L1370.97 569.398L1389.39 567.424L1383.8 619.725C1383.58 622.795 1381.61 625.317 1377.88 627.291C1374.15 629.264 1369.76 630.799 1364.72 631.896C1359.68 632.992 1355.07 633.76 1350.91 634.198C1346.74 634.637 1344 634.856 1342.68 634.856Z" fill="#0680F9"/></g></g></g></g><g clip-path="url(#clip6_348_9)"><g clip-path="url(#clip7_348_9)"><path d="M851.241 218.057L817.656 236.662C796.941 248.116 773.661 254.132 749.99 254.147C726.321 254.131 703.042 248.116 682.329 236.662L641.14 213.843C641.655 232.962 640.849 253.276 633.057 269.483C630.908 273.908 626.609 277.912 626.689 283.232C626.782 290.612 635.174 291.857 641.214 290.734C641.214 290.734 676.822 283.906 726.094 332.195C730.987 336.994 735.815 341.509 742.446 343.855C755.422 348.458 765.069 340.506 773.984 332.11C780.053 326.402 786.82 321.448 793.619 316.629C809.943 305.096 830.66 290.593 851.456 290.242C851.456 290.242 878.283 296.095 862.676 271.22C862.676 271.22 855.525 248.177 851.241 218.057Z" fill="#0A89F8"/><path d="M586.093 199.513L578.287 246.341V308.781H609.507V246.341L601.701 199.513V156.31L586.093 147.661V199.513Z" fill="#0A89F8"/><path d="M953.694 101.71L802.54 17.9868C786.464 9.07515 768.385 4.39941 750.004 4.39941C731.623 4.39941 713.545 9.07515 697.468 17.9868L546.291 101.71C536.934 106.898 536.934 120.422 546.291 125.62L586.094 147.657V113.665H765.602V129.272H601.702V156.306L697.464 209.347C713.541 218.255 731.619 222.928 750 222.928C768.38 222.928 786.458 218.255 802.535 209.347L953.69 125.624C963.069 120.422 963.069 106.903 953.694 101.71Z" fill="#0A89F8"/></g></g><path d="M1498.66 320.241H991.012V341.421H1498.66V320.241Z" fill="#0A89F8"/><path d="M508.989 320.241H1.33789V341.421H508.989V320.241Z" fill="#0A89F8"/><path d="M1498.66 277.881H991.012V299.061H1498.66V277.881Z" fill="#0A89F8"/><path d="M508.989 277.881H1.33789V299.061H508.989V277.881Z" fill="#0A89F8"/></g></g><defs><clipPath id="clip0_348_9"><rect width="1497.33" height="631.115" fill="white" transform="translate(1.33789 4.39941)"/></clipPath><clipPath id="clip1_348_9"><rect width="1497.33" height="631.115" fill="white" transform="translate(1.33789 4.39941)"/></clipPath><clipPath id="clip2_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip3_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip4_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip5_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip6_348_9"><rect width="482.023" height="340.808" fill="white" transform="translate(508.988 4.39941)"/></clipPath><clipPath id="clip7_348_9"><rect width="421.452" height="340.808" fill="white" transform="translate(539.273 4.39941)"/></clipPath></defs></svg>
            </a>

            <div class="box">
                <div class="boc__banner">
                    <img class="box__image" src="https://bluelearn-bc.liara.run/courses/covers/${courseData.data.cover}" alt="">
                </div>
                <h2 class="box__name">${courseData.data.name}</h2>
                <div class="box__price-wrapper">
                    <span class="box__price-text">
                        <i class="box__price-text-icon fas fa-money-bill"></i>
                        قیمت
                    </span>
                    <span class="box__price-number">${courseData.data.price ? courseData.data.price.toLocaleString() + ' تومان' : 'رایگان'}</span>
                </div>
            </div>
            <button onclick="${courseData.data.price ? 'registerToNotFreeCourse()' : `registerToFreeCourse('${courseData.data._id}')`}" class="buy-btn">${courseData.data.price ? 'تکمیل خرید' : 'ثبت نام'}</button>
            <a href="/pages/course/course.html?short-name=${courseData.data.shortName}" class="cancel-buy">انصراف از خرید و بازگشت</a>

        `)
    }else{
        mainSection.insertAdjacentHTML('beforeend', `
            <a href="/" class="logo-wrapper-registered">
                <svg class="logo-icon" viewBox="0 0 1500 636" fill="none"><g clip-path="url(#clip0_348_9)"><g clip-path="url(#clip1_348_9)"><g clip-path="url(#clip2_348_9)"><g clip-path="url(#clip3_348_9)"><g clip-path="url(#clip4_348_9)"><g clip-path="url(#clip5_348_9)"><path d="M11.9303 632.883C7.98306 632.883 5.24191 631.128 3.70686 627.62C2.17182 624.111 1.4043 619.396 1.4043 613.475C1.4043 609.089 1.73324 604.155 2.39111 598.673L23.4431 407.56C31.7762 406.464 40.7014 405.477 50.2187 404.6C59.7798 403.722 70.5909 403.284 82.652 403.284C105.239 403.284 123.068 405.477 136.137 409.863C149.163 414.248 158.483 420.279 164.097 427.954C169.667 435.629 172.452 444.401 172.452 454.269C172.452 466.33 168.834 477.119 161.597 486.637C154.36 496.198 144.931 504.049 133.308 510.189L123.111 515.781C117.19 518.631 111.927 521 107.322 522.886C102.717 524.728 98.7699 525.649 95.4806 525.649C89.3404 525.649 84.0335 523.938 79.56 520.517C75.0426 517.14 72.7838 513.807 72.7838 510.518C72.7838 508.983 73.2882 507.82 74.297 507.031C75.2618 506.285 76.6215 505.693 78.3758 505.255C85.1738 503.281 91.7526 500.364 98.1121 496.505C104.472 492.689 109.691 487.645 113.77 481.374C117.804 475.146 119.822 467.427 119.822 458.217C119.822 447.252 115.436 439.796 106.664 435.849C97.8928 431.901 86.7089 429.928 73.1128 429.928L57.6527 577.95C57.4334 580.143 57.2799 582.27 57.1922 584.331C57.0606 586.437 56.9948 588.586 56.9948 590.779C56.9948 593.191 57.0606 595.099 57.1922 596.502C57.2799 597.949 57.4334 599.879 57.6527 602.291C77.8276 602.291 93.7262 598.563 105.349 591.107C116.971 583.652 122.782 571.59 122.782 554.924C122.782 545.714 120.546 537.929 116.072 531.57C111.555 525.21 106.993 520.386 102.388 517.096L126.401 504.268C136.269 506.899 145.216 510.912 153.242 516.307C161.224 521.658 167.584 528.061 172.32 535.517C177.013 542.973 179.36 551.087 179.36 559.858C179.36 573.893 175.961 586.173 169.163 596.699C162.365 607.225 151.685 615.449 137.124 621.37C122.519 627.291 103.594 630.251 80.3494 630.251C75.9636 630.251 70.4374 630.361 63.7709 630.58C57.0606 630.799 50.1968 631.128 43.1794 631.567C36.1621 632.005 29.8026 632.334 24.101 632.554C18.3994 632.773 14.3425 632.883 11.9303 632.883ZM249.095 634.856H220.477C212.582 634.856 207.319 632.817 204.688 628.738C202.056 624.703 200.85 618.738 201.07 610.844C201.289 603.388 201.881 594.506 202.846 584.2C203.855 573.893 205.017 563.696 206.333 553.609L217.846 467.098C218.942 458.765 218.723 451.747 217.188 446.046C215.653 440.344 213.942 435.235 212.056 430.717C210.214 426.244 209.293 421.924 209.293 417.757C209.293 414.468 211.376 411.551 215.543 409.007C219.709 406.507 224.797 404.49 230.806 402.955C236.858 401.42 242.626 400.652 248.108 400.652C256.441 400.652 262.406 403.174 266.002 408.218C269.642 413.262 271.462 418.963 271.462 425.323C271.462 428.612 271.243 433.765 270.805 440.783C270.366 447.8 269.489 455.804 268.173 464.795L257.647 540.451C255.454 556.24 253.744 572.358 252.516 588.805C251.331 605.252 250.191 620.602 249.095 634.856ZM325.671 634.527C317.119 634.527 309.685 632.049 303.369 627.093C296.966 622.181 293.764 614.352 293.764 603.607C293.764 600.318 293.83 597.248 293.962 594.397C294.093 591.546 294.422 588.037 294.949 583.871C295.519 579.704 296.22 574.003 297.054 566.766L309.553 468.743H339.158C342.886 468.743 346.46 470.87 349.881 475.124C353.302 479.422 355.013 484.641 355.013 490.781C355.013 495.386 354.662 501.417 353.96 508.873C353.302 516.329 352.337 524.552 351.065 533.543L346.789 562.161C345.868 568.301 345.188 573.169 344.75 576.766C344.311 580.406 344.092 583.761 344.092 586.831C344.092 589.024 344.377 591.042 344.947 592.884C345.473 594.77 346.723 595.713 348.697 595.713C351.372 595.713 354.837 593.52 359.091 589.134C363.346 584.748 367.841 578.937 372.578 571.7C377.315 564.463 381.744 556.613 385.867 548.148C390.077 539.727 393.498 531.46 396.13 523.346C398.718 515.232 400.011 508.105 400.011 501.965C400.011 496.922 399.419 492.689 398.235 489.268C397.007 485.891 396.503 483.106 396.722 480.913C396.722 478.94 398.498 477.185 402.051 475.65C405.559 474.115 409.77 472.843 414.682 471.835C419.638 470.87 424.419 470.102 429.024 469.532C433.585 469.006 436.962 468.743 439.155 468.743C443.76 468.743 447.444 470.935 450.207 475.321C452.926 479.707 453.848 485.957 452.97 494.071L437.51 633.54H410.603C407.709 633.54 405.077 632.378 402.709 630.054C400.296 627.773 398.301 624.988 396.722 621.699C395.231 618.409 394.485 615.23 394.485 612.159C394.485 607.116 395.362 601.633 397.117 595.713C398.827 589.792 401.174 582.226 404.156 573.016C407.138 563.806 410.581 551.964 414.485 537.491V543.083C405.932 565.45 396.854 583.323 387.249 596.699C377.556 610.076 367.556 619.725 357.249 625.646C346.987 631.567 336.461 634.527 325.671 634.527ZM531.258 635.514C514.372 635.514 500.513 630.185 489.68 619.528C478.803 608.914 473.365 594.287 473.365 575.647C473.365 560.078 475.777 545.824 480.601 532.885C485.426 519.947 492.18 508.654 500.864 499.005C509.504 489.356 519.482 481.9 530.797 476.637C542.069 471.374 554.064 468.743 566.783 468.743C580.818 468.743 592.659 471.966 602.308 478.413C611.957 484.904 616.781 494.29 616.781 506.57C616.781 518.412 612.352 528.829 603.492 537.819C594.589 546.81 582.243 554.53 566.454 560.977C550.665 567.468 532.354 572.906 511.521 577.292L507.245 554.266C517.771 552.951 527.486 550.473 536.389 546.832C545.248 543.236 552.529 538.477 558.231 532.556C563.932 526.636 567.002 519.838 567.441 512.162C567.879 506.899 567.112 502.448 565.138 498.807C563.165 495.211 560.204 493.413 556.257 493.413C551.432 493.413 546.564 496.593 541.652 502.952C536.696 509.312 532.573 517.754 529.284 528.28C525.995 538.806 524.35 550.209 524.35 562.49C524.35 573.674 525.666 582.599 528.297 589.265C530.929 595.976 536.74 599.331 545.731 599.331C554.722 599.331 563.45 597.511 571.914 593.871C580.335 590.274 587.287 586.722 592.769 583.213C594.523 582.116 596.278 581.064 598.032 580.055C599.786 579.09 601.321 578.608 602.637 578.608C604.172 578.608 605.378 579.2 606.255 580.384C607.133 581.612 607.571 583.103 607.571 584.858C607.571 588.805 605.927 593.629 602.637 599.331C599.348 605.032 594.48 610.624 588.032 616.107C581.541 621.589 573.581 626.194 564.151 629.922C554.722 633.65 543.757 635.514 531.258 635.514ZM712.173 634.198C708.226 634.198 705.2 631.786 703.095 626.962C701.033 622.137 700.003 616.765 700.003 610.844C700.003 602.291 700.99 588.366 702.963 569.069L720.726 401.639L753.62 401.31C762.611 401.091 768.246 403.174 770.527 407.56C772.852 411.946 773.246 421.047 771.711 434.862L756.58 572.358C756.142 576.963 755.966 581.722 756.054 586.634C756.185 591.59 756.58 596.37 757.238 600.976L819.407 586.831C823.355 585.954 827.346 585.011 831.381 584.002C835.46 583.037 838.266 582.555 839.802 582.555C843.529 582.555 845.393 585.516 845.393 591.436C845.393 595.384 844.341 600.427 842.236 606.568C840.174 612.708 837.323 618.19 833.683 623.014C830.087 627.839 825.876 630.251 821.052 630.251H806.25C789.803 630.251 775.22 630.58 762.501 631.238C749.782 631.896 739.19 632.554 730.726 633.212C722.305 633.869 716.121 634.198 712.173 634.198ZM910.852 635.514C893.967 635.514 880.085 630.185 869.209 619.528C858.376 608.914 852.959 594.287 852.959 575.647C852.959 560.078 855.371 545.824 860.196 532.885C865.02 519.947 871.752 508.654 880.392 499.005C889.076 489.356 899.054 481.9 910.326 476.637C921.641 471.374 933.658 468.743 946.377 468.743C960.412 468.743 972.254 471.966 981.903 478.413C991.552 484.904 996.376 494.29 996.376 506.57C996.376 518.412 991.924 528.829 983.021 537.819C974.162 546.81 961.837 554.53 946.048 560.977C930.259 567.468 911.948 572.906 891.116 577.292L886.84 554.266C897.366 552.951 907.058 550.473 915.918 546.832C924.821 543.236 932.123 538.477 937.825 532.556C943.527 526.636 946.597 519.838 947.035 512.162C947.474 506.899 946.706 502.448 944.733 498.807C942.759 495.211 939.799 493.413 935.851 493.413C931.027 493.413 926.137 496.593 921.181 502.952C916.269 509.312 912.168 517.754 908.878 528.28C905.589 538.806 903.944 550.209 903.944 562.49C903.944 573.674 905.26 582.599 907.892 589.265C910.523 595.976 916.334 599.331 925.325 599.331C934.316 599.331 943.022 597.511 951.443 593.871C959.908 590.274 966.881 586.722 972.363 583.213C974.118 582.116 975.872 581.064 977.627 580.055C979.381 579.09 980.916 578.608 982.232 578.608C983.767 578.608 984.973 579.2 985.85 580.384C986.727 581.612 987.166 583.103 987.166 584.858C987.166 588.805 985.521 593.629 982.232 599.331C978.942 605.032 974.052 610.624 967.561 616.107C961.114 621.589 953.175 626.194 943.746 629.922C934.316 633.65 923.352 635.514 910.852 635.514ZM1045.32 635.514C1033.04 635.514 1023.46 630.405 1016.57 620.186C1009.64 610.01 1006.18 596.151 1006.18 578.608C1006.18 562.599 1008.77 547.907 1013.94 534.53C1019.07 521.153 1026.09 509.575 1034.99 499.794C1043.85 490.058 1053.87 482.492 1065.06 477.098C1076.24 471.747 1087.86 469.071 1099.93 469.071C1109.36 469.071 1117.97 470.321 1125.78 472.821C1133.54 475.365 1140.17 477.953 1145.65 480.584L1136.11 524.662C1130.41 520.715 1124.05 516.592 1117.03 512.294C1110.01 508.04 1103.22 504.421 1096.64 501.439C1090.06 498.5 1084.47 497.031 1079.86 497.031C1075.47 497.031 1071.37 500.54 1067.56 507.557C1063.7 514.575 1060.63 523.39 1058.35 534.004C1056.02 544.661 1054.86 555.582 1054.86 566.766C1054.86 576.415 1055.41 584.463 1056.51 590.91C1057.6 597.401 1059.58 600.647 1062.43 600.647C1064.84 600.647 1068.96 597.73 1074.79 591.897C1080.58 586.108 1087.86 575.976 1096.64 561.503C1105.41 547.03 1115.17 526.855 1125.91 500.978L1138.74 532.556C1126.9 558.872 1115.61 579.529 1104.86 594.528C1094.11 609.572 1083.87 620.164 1074.14 626.304C1064.36 632.444 1054.75 635.514 1045.32 635.514ZM1153.54 633.54H1129.2C1122.18 633.54 1117.47 632.005 1115.06 628.935C1112.64 625.865 1111.44 621.918 1111.44 617.094C1111.44 613.366 1111.94 608.475 1112.95 602.423C1113.92 596.414 1115.17 589.901 1116.7 582.884C1118.24 575.867 1119.88 569.288 1121.64 563.148L1128.87 538.477L1117.69 529.925L1125.58 480.255C1132.6 479.159 1139.35 477.733 1145.85 475.979C1152.29 474.225 1158.04 472.69 1163.08 471.374C1168.13 470.058 1171.85 469.4 1174.27 469.4C1178.43 469.4 1180.52 471.593 1180.52 475.979C1180.52 477.953 1179.16 482.777 1176.44 490.452C1173.67 498.128 1170.76 507.842 1167.69 519.596C1164.62 531.307 1162.31 544.398 1160.78 558.872L1153.54 633.54ZM1246.63 619.725L1234.13 572.687C1242.25 551.635 1250.47 533.39 1258.8 517.952C1267.14 502.47 1275.69 490.452 1284.46 481.9C1293.23 473.348 1302.11 469.071 1311.1 469.071C1316.81 469.071 1321.59 470.607 1325.45 473.677C1329.26 476.747 1331.17 482.119 1331.17 489.795C1331.17 494.838 1330.51 499.882 1329.2 504.926C1327.88 509.969 1326.02 514.136 1323.6 517.425C1321.19 520.715 1318.34 522.359 1315.05 522.359C1312.2 522.359 1308.76 521.307 1304.72 519.202C1300.64 517.14 1296.08 516.11 1291.04 516.11C1287.75 516.11 1283.98 518.675 1279.72 523.807C1275.43 528.982 1271.04 536.175 1266.57 545.385C1262.05 554.595 1258.04 565.494 1254.53 578.082C1251.02 590.713 1248.39 604.594 1246.63 619.725ZM1205.51 634.856C1202.66 634.856 1200.43 634.374 1198.8 633.409C1197.14 632.4 1196.15 629.812 1195.84 625.646C1195.49 621.479 1195.87 614.791 1196.96 605.581L1212.42 468.743H1244.66C1250.58 468.743 1254.81 471.155 1257.36 475.979C1259.86 480.804 1261.11 486.286 1261.11 492.426C1261.11 495.277 1259.96 499.707 1257.68 505.715C1255.36 511.768 1252.84 518.127 1250.12 524.794C1247.36 531.504 1245.21 537.381 1243.67 542.425L1235.78 569.398L1252.22 567.424L1246.63 619.725C1246.41 622.795 1244.44 625.317 1240.71 627.291C1236.98 629.264 1232.6 630.799 1227.55 631.896C1222.51 632.992 1217.9 633.76 1213.74 634.198C1209.57 634.637 1206.83 634.856 1205.51 634.856ZM1479.19 633.54H1446.96C1443.45 633.54 1440.82 631.94 1439.06 628.738C1437.31 625.58 1436.1 622.137 1435.44 618.409C1434.78 614.681 1434.46 611.831 1434.46 609.857C1434.46 606.787 1434.67 603.278 1435.11 599.331C1435.55 595.384 1436.03 591.217 1436.56 586.831C1437.13 582.445 1437.74 578.279 1438.4 574.332L1443.99 540.122C1444.65 535.736 1445.46 531.175 1446.43 526.438C1447.44 521.745 1447.94 517.974 1447.94 515.123C1447.94 512.711 1447.39 510.956 1446.3 509.86C1445.2 508.763 1443.89 508.215 1442.35 508.215C1439.5 508.215 1435.22 510.847 1429.52 516.11C1423.82 521.373 1417.79 528.938 1411.43 538.806C1405.07 548.674 1399.3 560.45 1394.13 574.134C1389 587.862 1385.55 603.059 1383.8 619.725L1370.97 569.398C1377.55 550.319 1385.01 534.355 1393.34 521.504C1401.67 508.698 1410.27 498.457 1419.13 490.781C1428.03 483.106 1436.58 477.558 1444.78 474.137C1453.03 470.76 1460.33 469.071 1466.69 469.071C1474.59 469.071 1480.88 470.541 1485.57 473.479C1490.31 476.462 1493.66 480.255 1495.64 484.86C1497.61 489.466 1498.6 494.071 1498.6 498.676C1498.6 504.597 1498.2 509.969 1497.41 514.794C1496.67 519.618 1495.86 524.881 1494.98 530.583L1479.19 633.54ZM1342.68 634.856C1339.83 634.856 1337.57 634.374 1335.91 633.409C1334.28 632.4 1333.3 629.812 1332.95 625.646C1332.64 621.479 1333.03 614.791 1334.13 605.581L1349.59 468.743H1381.83C1387.75 468.743 1391.96 471.155 1394.46 475.979C1397 480.804 1398.27 486.286 1398.27 492.426C1398.27 495.277 1397.07 499.707 1394.65 505.715C1392.24 511.768 1389.54 518.127 1386.56 524.794C1383.62 531.504 1381.28 537.381 1379.52 542.425L1370.97 569.398L1389.39 567.424L1383.8 619.725C1383.58 622.795 1381.61 625.317 1377.88 627.291C1374.15 629.264 1369.76 630.799 1364.72 631.896C1359.68 632.992 1355.07 633.76 1350.91 634.198C1346.74 634.637 1344 634.856 1342.68 634.856Z" fill="#0680F9"/></g></g></g></g><g clip-path="url(#clip6_348_9)"><g clip-path="url(#clip7_348_9)"><path d="M851.241 218.057L817.656 236.662C796.941 248.116 773.661 254.132 749.99 254.147C726.321 254.131 703.042 248.116 682.329 236.662L641.14 213.843C641.655 232.962 640.849 253.276 633.057 269.483C630.908 273.908 626.609 277.912 626.689 283.232C626.782 290.612 635.174 291.857 641.214 290.734C641.214 290.734 676.822 283.906 726.094 332.195C730.987 336.994 735.815 341.509 742.446 343.855C755.422 348.458 765.069 340.506 773.984 332.11C780.053 326.402 786.82 321.448 793.619 316.629C809.943 305.096 830.66 290.593 851.456 290.242C851.456 290.242 878.283 296.095 862.676 271.22C862.676 271.22 855.525 248.177 851.241 218.057Z" fill="#0A89F8"/><path d="M586.093 199.513L578.287 246.341V308.781H609.507V246.341L601.701 199.513V156.31L586.093 147.661V199.513Z" fill="#0A89F8"/><path d="M953.694 101.71L802.54 17.9868C786.464 9.07515 768.385 4.39941 750.004 4.39941C731.623 4.39941 713.545 9.07515 697.468 17.9868L546.291 101.71C536.934 106.898 536.934 120.422 546.291 125.62L586.094 147.657V113.665H765.602V129.272H601.702V156.306L697.464 209.347C713.541 218.255 731.619 222.928 750 222.928C768.38 222.928 786.458 218.255 802.535 209.347L953.69 125.624C963.069 120.422 963.069 106.903 953.694 101.71Z" fill="#0A89F8"/></g></g><path d="M1498.66 320.241H991.012V341.421H1498.66V320.241Z" fill="#0A89F8"/><path d="M508.989 320.241H1.33789V341.421H508.989V320.241Z" fill="#0A89F8"/><path d="M1498.66 277.881H991.012V299.061H1498.66V277.881Z" fill="#0A89F8"/><path d="M508.989 277.881H1.33789V299.061H508.989V277.881Z" fill="#0A89F8"/></g></g><defs><clipPath id="clip0_348_9"><rect width="1497.33" height="631.115" fill="white" transform="translate(1.33789 4.39941)"/></clipPath><clipPath id="clip1_348_9"><rect width="1497.33" height="631.115" fill="white" transform="translate(1.33789 4.39941)"/></clipPath><clipPath id="clip2_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip3_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip4_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip5_348_9"><rect width="1497.33" height="234.862" fill="white" transform="translate(1.33789 400.652)"/></clipPath><clipPath id="clip6_348_9"><rect width="482.023" height="340.808" fill="white" transform="translate(508.988 4.39941)"/></clipPath><clipPath id="clip7_348_9"><rect width="421.452" height="340.808" fill="white" transform="translate(539.273 4.39941)"/></clipPath></defs></svg>
            </a>

            <div class="box">
                <h2 class="box__success-text">با موفقیت در دوره ثبت نام شدید.</h2>
                <a href="/pages/course/course.html?short-name=${courseData.data.shortName}" class="seecourse-link">مشاهده دوره</a>
            </div>
        `)
    }


})