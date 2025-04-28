import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";


type BarcodeData = {
 type: string;
 data: string;
};


export default function Barcode() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

 useEffect(() => {
   const getCameraPermissions = async () => {
     const { status } = await Camera.requestCameraPermissionsAsync();
     setHasPermission(status === "granted");
   };
   getCameraPermissions();
 }, []);


  useEffect(() => {
    if (barcodeData) {
      sendToBackend({ input: barcodeData });
    }
  }, [barcodeData]);

  useEffect(() => {
    if (imageBase64) {
      sendToBackend({ image: imageBase64 });
    }
  }, [imageBase64]);

  const sendToBackend = (payload: any) => {
    fetch("https://wello-backend.onrender.com/main", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server error: ${response.status} - ${text.slice(0, 100)}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("got the response: ", data);
        router.push({
          pathname: "/food-detail",
          params: {
            geminiOutput: data.gemini_output,
            nutritionInfo: data.nutrition_info,
            title: data.product_title,
          },
        });
      })
      .catch(error => {
        console.log("error: ", error.message);
        setScanned(false);
        setImageBase64(null);
        setIsTakingPicture(false);
      });
  };

  const handleBarcodeScanned = ({ type, data }: BarcodeData) => {
    if (scanned) return;
    setScanned(true);
    setBarcodeData(data);
  };

  const takePicture = async () => {
    if (cameraRef.current && !isTakingPicture) {
      setIsTakingPicture(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });
        if (photo) {
          setImageBase64(photo.base64 || null);
        }
        setScanned(true);
      } catch (error) {
        console.log("Error taking picture:", error);
        setIsTakingPicture(false);
      }
    }
  };

 if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
 if (hasPermission === false) return <Text>No access to camera</Text>;


 return (
   <View style={styles.container}>
     <CameraView
       onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
       barcodeScannerSettings={{
         barcodeTypes: ["qr", "pdf417", "upc_a", "ean8", "ean13", "aztec"],
       }}
       style={styles.camera}
     />


      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.scanText}>Scan Barcode or Take Photo</Text>
      </View>

      {scanned && (
        <View style={styles.resultContainer}>
          <AntDesign name="checkcircle" size={60} color="#4CAF50" />
          <Text style={styles.successText}>
            {barcodeData ? "Barcode Scanned!" : "Photo Captured!"}
          </Text>
        </View>
      )}

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="image" size={30} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={takePicture}
          disabled={scanned || isTakingPicture}
        >
          <View style={styles.cameraButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="search1" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", justifyContent: "center" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20,
  },
  scanText: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  resultContainer: {
    position: "absolute",
    bottom: 180,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  successText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    borderRadius: 40,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});