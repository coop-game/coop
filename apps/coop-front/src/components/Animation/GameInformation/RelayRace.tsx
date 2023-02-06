import { Box, useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function RelayRaceInformationAnimation() {
  const { colorMode } = useColorMode();
  const whiteIcon = {
    hidden: {
      opacity: 0,
      fill: colorMode === "light" ? "#000000" : "#ffffff",
      x: "-24px",
      y: "24px",
      scale: [1, 1.3],
    },
    visible: {
      opacity: 1,
      fill: colorMode === "light" ? "#000000" : "#ffffff",
    },
  };
  return (
    <Box w="100%" display={"flex"} justifyContent="center">
      <svg
        viewBox="-326 0 800 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M106.407 96.8913C111.542 102.976 114.23 109.624 114.119 117.272C113.966 127.809 108.553 135.741 100.947 142.254C92.0832 149.843 81.3711 153.044 69.9069 153.943C67.396 154.087 64.8793 154.095 62.3675 153.968C61.2825 153.947 60.2075 153.756 59.1817 153.401C55.071 151.912 54.4462 148.867 57.7062 146.002C60.9065 143.191 64.3602 140.658 67.443 137.729C69.8054 135.468 71.9448 132.984 73.8318 130.313C75.8297 127.501 76.0056 124.257 74.7671 120.518C72.7928 121.437 70.9019 122.169 69.1639 123.165C65.5199 125.253 63.4643 125.166 60.3381 122.422C57.3006 119.755 54.3156 117.028 51.2938 114.343C50.8442 113.992 50.3743 113.668 49.8866 113.373C48.0535 115.067 46.3496 116.757 44.523 118.301C42.1025 120.348 39.7016 120.401 38.131 118.589C36.6588 116.893 36.901 114.651 39.0282 112.471C40.5377 110.923 42.2626 109.584 43.5372 108.461C40.1098 104.278 36.6555 100.848 34.1719 96.8237C31.2696 92.1178 34.8565 87.9231 37.0979 83.3189C32.8192 83.0504 29.3006 83.8341 26.4724 86.0033C23.7734 88.1917 21.3394 90.6881 19.2199 93.4416C17.1669 95.975 15.57 98.8767 13.7474 101.599C12.0291 104.166 10.2688 106.864 6.65102 106.491C4.14644 106.233 0.654067 101.721 0.422379 98.33C-0.102691 90.599 0.881819 83.0753 4.49168 76.0867C11.1049 63.2881 21.523 54.9657 35.0947 50.5131C40.7812 48.6478 46.5098 49.2418 52.3098 51.0087C52.6314 50.6385 53.0088 50.2697 53.3107 49.8476C68.9736 27.9581 90.3183 14.0634 115.597 5.81196C124.206 3.00217 132.916 0.444402 142.093 0.21009C144.385 0.151676 146.679 -0.0235928 148.97 0.00266074C151.958 0.036134 153.448 1.09614 153.327 4.01488C153.172 9.66322 152.644 15.2951 151.744 20.8736C148.056 41.8521 137.967 59.8443 124.863 76.254C119.763 82.6415 114.02 88.5177 108.563 94.621C107.918 95.3403 107.232 96.0243 106.407 96.8913ZM55.4163 106.628C58.8292 109.34 61.3148 111.468 63.9867 113.323C64.4408 113.537 64.9369 113.646 65.4389 113.644C65.9408 113.641 66.4358 113.527 66.8877 113.308C71.1231 111.063 75.4543 108.915 79.3969 106.215C93.4392 96.5986 106.143 85.4257 116.822 72.1336C122.616 64.9224 127.917 57.3167 133.55 49.7426L100.91 19.4316C99.8323 19.9355 98.7827 20.4966 97.7652 21.1125C91.3987 25.3374 84.9081 29.3961 78.7602 33.9196C71.8687 38.9892 66.0371 45.1843 60.8311 52.0129C52.1969 63.3367 47.1136 76.5599 40.7248 89.0828C40.0895 90.3299 40.4459 92.8417 41.3464 93.9568C43.6901 96.8598 46.5925 99.3126 49.7416 102.406C54.6641 97.3035 58.9959 92.5352 63.6454 88.0938C66.324 85.689 69.196 83.5087 72.2323 81.575C73.8285 80.4907 75.8664 80.1212 77.3268 81.7864C78.8068 83.4745 77.5322 85.1277 76.4919 86.4844C75.2622 88.0169 73.9298 89.4642 72.504 90.8162C69.5505 93.7356 66.5904 96.6465 63.5476 99.4701C60.9951 101.843 58.3212 104.081 55.4163 106.628ZM147.141 6.3889C133.175 6.41712 120.848 11.6094 108.28 15.8349L108.056 16.7045L136.962 41.0731C141.915 33.2233 145.713 20.2816 147.141 6.3889ZM77.9707 141.64C89.7309 139.425 98.8422 133.46 103.962 122.528C107.375 115.232 104.991 108.423 100.968 101.949C94.1966 107.118 87.7199 112.064 81.2445 117.008C86.3449 126.009 83.7327 133.936 77.9707 141.64ZM48.698 56.4944C31.8839 53.7377 8.64104 76.4733 10.1486 92.0817C17.0146 81.239 25.8253 74.7064 39.084 77.0567L48.698 56.4944Z"
            fill={colorMode === "light" ? "#000000" : "#FFF"}
          ></path>
          <motion.path
            d="M14.6051 140.579C15.1033 139.678 15.6382 138.038 16.7054 136.898C20.7301 132.601 24.9024 128.441 29.0774 124.288C30.3034 123.068 31.8543 122.299 33.4499 123.601C35.1327 124.974 34.3963 126.615 33.402 127.973C29.989 132.633 26.5682 137.293 22.9616 141.802C21.8888 143.034 20.5253 143.979 18.9947 144.55C16.7225 145.446 14.5257 143.644 14.6051 140.579Z"
            animate="hidden"
            initial="visible"
            variants={whiteIcon}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          ></motion.path>
          <motion.path
            d="M51.9876 123.87C54.4075 123.936 56.1665 126.118 55.0901 127.808C52.3487 132.062 49.3371 136.136 46.074 140.004C44.905 141.404 42.8061 141.206 41.3214 139.866C40.6426 139.292 40.1985 138.488 40.0735 137.607C39.9485 136.727 40.1513 135.831 40.6434 135.09C41.5342 133.607 42.5933 132.232 43.7998 130.991C45.587 129.088 47.4753 127.273 49.4167 125.529C50.22 124.897 51.0807 124.342 51.9876 123.87Z"
            animate="hidden"
            initial="visible"
            variants={whiteIcon}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          ></motion.path>
          <motion.path
            d="M30.3682 105.409C29.9062 106.43 29.3605 107.411 28.7366 108.341C25.689 112.145 22.5946 115.911 19.4534 119.638C18.8631 120.274 18.1765 120.813 17.4187 121.234C15.8501 122.199 14.2552 122.197 12.9904 120.769C11.6836 119.294 11.9737 117.656 13.2838 116.387C17.5723 112.23 21.91 108.121 26.3337 104.109C26.912 103.584 28.1433 103.499 28.9893 103.655C29.4973 103.749 29.8465 104.705 30.3682 105.409Z"
            animate="hidden"
            initial="visible"
            variants={whiteIcon}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          ></motion.path>
          <path
            d="M99.4671 35.7334C103.729 35.6749 107.015 37.4181 110.313 40.1649C113.732 43.0121 116.286 46.049 117.548 50.2935C120.461 60.111 114.697 67.338 105.35 68.6599C97.775 69.731 91.3495 66.6114 86.6757 60.6814C82.672 55.6 82.5638 49.6871 85.3407 44.0052C88.1407 38.2721 93.1846 35.7944 99.4671 35.7334ZM90.4707 51.4625C91.5654 53.3514 92.3511 55.7595 93.9821 57.2317C95.6715 58.7564 98.1281 59.5118 100.344 60.3545C103.255 61.4624 105.775 60.2889 107.753 58.2294C109.668 56.2374 109.739 53.7354 108.803 51.1869C107.329 47.1688 103.891 45.1524 100.438 43.3337C97.3373 41.7008 94.3949 42.6774 92.6274 45.7353C91.7262 47.2915 91.3232 49.1358 90.4707 51.4625Z"
            fill={colorMode == "light" ? "#000000" : "#FFF"}
          ></path>
        </g>
      </svg>
    </Box>
  );
}
