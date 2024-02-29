import { Component } from "react";
import { Profile, Spotify } from "../../components";
import styles from "./BusinessCard.module.scss";

class BusinessCard extends Component {
    render() {
        if(!this.props?.data) {
            return ''
        }

        return (
            <main className={styles.block}>
                <Profile user={this.props.data.discord_user} status={this.props.data.discord_status} activity={this.props.data.activities[0] || null} updateTheme={this.props.updateTheme} />
                { this.props.data?.spotify && <Spotify data={this.props.data.spotify} getData={this.props.getData.bind(this)} /> }
            </main>
        )
    }
}

export default BusinessCard