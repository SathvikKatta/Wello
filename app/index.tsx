import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";

type BarcodeData = {
  type: string;
  data: string;
};

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false); // State to track if barcode was scanned
  const [barcodeData, setBarcodeData] = useState<string | null>(null); // State to store barcode data

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: BarcodeData) => {
    if (scanned) return; // Prevent rescanning after one scan
    setScanned(true);
    setBarcodeData(data); // Store barcode data
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // Reset the scan state to allow another scan
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
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} // Disable scanning if already scanned
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "upc_a", "ean8", "ean13", "aztec"],
        }}
        style={styles.camera}
      />
      <View style={styles.overlay}>
        {scanned && barcodeData ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Scanned Barcode: {barcodeData}</Text>
            <TouchableOpacity onPress={handleScanAgain} style={styles.button}>
              <Text style={styles.buttonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.instructions}>Scan a barcode to get started</Text>
        )}
      </View>
      {scanned && (
        <TouchableOpacity style={styles.floatingButton} onPress={handleScanAgain}>
          <AntDesign name="reload1" size={40} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
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
  floatingButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "#FF6347",
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
