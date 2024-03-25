import { OTPublisher, OTSession, OTSubscriber } from "opentok-react-native";
import { Text } from "react-native"
import { View } from "react-native"

const OpenTok = () => {
    return <View style={{
        padding: 50
    }}>
        <OTSession apiKey="46337942" sessionId="2_MX40NjMzNzk0Mn5-MTcxMTM3NTkyMDkzMH42ZnRzajBuQ1B2T3VicXlrL0xvNkMrOHZ-UH5-" token="T1==cGFydG5lcl9pZD00NjMzNzk0MiZzaWc9MzZmYTJmNDE2NWFiMTA1ZWZjOTJiZjJjNDVjOWFiNDk1NDY5MDJjNTpzZXNzaW9uX2lkPTJfTVg0ME5qTXpOemswTW41LU1UY3hNVE0zTlRreU1Ea3pNSDQyWm5SemFqQnVRMUIyVDNWaWNYbHJMMHh2TmtNck9IWi1VSDUtJmNyZWF0ZV90aW1lPTE3MTEzNzU5MjEmbm9uY2U9MC44NzUyMTAzNTM3NzI2ODUyJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE3MTE0NjIzMjEmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=">
            <OTPublisher style={{ width: 100, height: 100 }} />
            <OTSubscriber style={{ width: 100, height: 100 }} />
        </OTSession>
    </View>
}


export default OpenTok;