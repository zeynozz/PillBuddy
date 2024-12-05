import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image,
    Modal,
    TextInput,
    Alert,
    ScrollView,
} from "react-native";
import {
    fetchLinks,
    saveLink,
    updateLink,
    deleteLink as deleteLinkFromFirebase,
} from "../database/storage";

const Service = () => {
    const defaultLinks = [
        {
            id: "default1",
            name: "Emergency Service",
            url: "https://www.apothekerkammer.at/apothekensuche",
            logo: require("../assets/apotheke.png"),
            isDefault: true,
        },
        {
            id: "default2",
            name: "Shop Apotheke",
            url: "https://www.shop-apotheke.com",
            logo: require("../assets/shopApotheke.png"),
            isDefault: true,
        },
        {
            id: "default3",
            name: "Medflex",
            url: "https://medflex.de/",
            logo: require("../assets/medflex.png"),
            isDefault: true,
        },
        {
            id: "default4",
            name: "Latido",
            url: "https://latido.at/",
            logo: require("../assets/latido.png"),
            isDefault: true,
        },
    ];

    const [links, setLinks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [newLinkName, setNewLinkName] = useState("");
    const [newLinkURL, setNewLinkURL] = useState("");

    useEffect(() => {
        const loadLinks = async () => {
            try {
                const fetchedLinks = await fetchLinks();
                // Merge default links with fetched links
                setLinks([...defaultLinks, ...fetchedLinks]);
            } catch (error) {
                console.error("Error fetching links:", error);
                // If fetching fails, still show default links
                setLinks(defaultLinks);
            }
        };
        loadLinks();
    }, []);

    const openLink = (url) => {
        Linking.openURL(url).catch(() => Alert.alert("Error", "Failed to open the link."));
    };

    const saveLinkToFirebase = async () => {
        if (!newLinkName || !newLinkURL) {
            Alert.alert("Error", "Please provide both a name and a URL.");
            return;
        }

        try {
            if (editingLink) {
                await updateLink(editingLink.id, { name: newLinkName, url: newLinkURL });
                setLinks((prevLinks) =>
                    prevLinks.map((link) =>
                        link.id === editingLink.id
                            ? { ...link, name: newLinkName, url: newLinkURL }
                            : link
                    )
                );
                Alert.alert("Success", "Link updated successfully!");
            } else {
                const id = await saveLink({ name: newLinkName, url: newLinkURL });
                setLinks([
                    ...links,
                    {
                        id,
                        name: newLinkName,
                        url: newLinkURL,
                        logo: require("../assets/logo.png"),
                    },
                ]);
                Alert.alert("Success", "New link added successfully!");
            }
        } catch (error) {
            console.error("Error saving link:", error);
        }

        setEditingLink(null);
        setNewLinkName("");
        setNewLinkURL("");
        setModalVisible(false);
    };

    const deleteLink = async (id, isDefault) => {
        if (isDefault) {
            Alert.alert("Action Not Allowed", "You cannot delete default links.");
            return;
        }

        Alert.alert("Delete Link", "Are you sure you want to delete this link?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteLinkFromFirebase(id);
                        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
                        Alert.alert("Success", "Link deleted successfully!");
                    } catch (error) {
                        console.error("Error deleting link:", error);
                    }
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {links.map((link) => (
                    <View key={link.id} style={styles.card}>
                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => openLink(link.url)}
                        >
                            <Image
                                source={link.logo || require("../assets/logo.png")}
                                style={styles.logo}
                            />
                            <Text style={styles.cardText}>{link.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.actions}>
                            {/* Edit Icon */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => {
                                    if (link.isDefault) {
                                        Alert.alert(
                                            "Action Not Allowed",
                                            "You cannot edit default links."
                                        );
                                        return;
                                    }
                                    setEditingLink(link);
                                    setNewLinkName(link.name);
                                    setNewLinkURL(link.url);
                                    setModalVisible(true);
                                }}
                            >
                                <Image
                                    source={require("../assets/pen.png")}
                                    style={[styles.icon, styles.editIcon]}
                                />
                            </TouchableOpacity>
                            {/* Delete Icon */}
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => deleteLink(link.id, link.isDefault)}
                            >
                                <Image
                                    source={require("../assets/delete.png")}
                                    style={[styles.icon, styles.deleteIcon]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => {
                    setEditingLink(null);
                    setNewLinkName("");
                    setNewLinkURL("");
                    setModalVisible(true);
                }}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>

            {/* Add or Edit Link Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editingLink ? "Edit Link" : "Add New Link"}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter link name"
                            value={newLinkName}
                            onChangeText={(text) => setNewLinkName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter link URL"
                            value={newLinkURL}
                            onChangeText={(text) => setNewLinkURL(text)}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={saveLinkToFirebase}>
                                <Text style={styles.modalButtonText}>
                                    {editingLink ? "Update" : "Add"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
    },
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    actions: {
        flexDirection: "row",
    },
    actionButton: {
        marginLeft: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    editIcon: {
        tintColor: "#198679",
    },
    deleteIcon: {
        tintColor: "#ff4d4f",
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#198679",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    floatingButtonText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        backgroundColor: "#198679",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Service;
