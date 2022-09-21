import { Toaster } from "react-hot-toast";

export const ToastNotification = (props) => {
  const { position = "top-right", top = 80, right = 10, left = 0, bottom =0} = props;

  return (
    <Toaster
      position={position}
      containerStyle={{
        top,
        right,
        left,
        bottom,
        zIndex:20000
      }}
      toastOptions={{
        style: {
          zIndex: 20000
        },
        success: {
          duration: 3000,
          theme: {
            primary: "#5FB6C3",
            secondary: "#F7C749",
          },
        },
      }}
    />
  );
};
