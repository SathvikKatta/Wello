import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type BarcodeData = {
  type: string;
  data: string;
};

export default function Barcode() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  useEffect(() => {
    if (barcodeData) {
      fetch("https://wello-backend.onrender.com/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({input: barcodeData})
      })
      .then(response => response.json())
      .then(data => {
        /*
          Data is the response from the API
          set state with data and then do whatever
          setNutritionInfo(data.nutrition_info)
          gemini output is data.gemini_output
        */
        console.log("got the response: ", data)
      })
      .catch(error => {
        console.log("error: ", error)
      })
    }
  }, [barcodeData])

  const handleBarcodeScanned = ({ type, data }: BarcodeData) => {
    if (scanned) return;
    setScanned(true);
    setBarcodeData(data);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setBarcodeData(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr", "pdf417", "upc_a", "ean8", "ean13", "aztec"] }}
        style={styles.camera}
      />
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.scanText}>Scan Barcode for Analysis</Text>
      </View>
      {scanned && barcodeData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Barcode: {barcodeData}</Text>
          <TouchableOpacity onPress={handleScanAgain} style={styles.button}>
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.scanButton} onPress={handleScanAgain}>
        <View style={styles.scanInnerCircle} />
      </TouchableOpacity>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="image" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="search1" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  scanButton: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  scanInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "gray",
  },
  bottomButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 40,
  },
});