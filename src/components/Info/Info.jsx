import { Component } from "react";
import { Tooltip } from "../index";
import styles from "./Info.module.scss";
import activity_image from "../../assets/img/activity_image.png"

export default class Info extends Component {
    render() {
        return (
            <div>
                <div className={styles.info}>
                    <div className={styles.image}>
                        <div className={this.getActivityStatus(this.props.status)} ></div>
                        <img alt='file' src={this.props.image} />
                    </div>
                    <div className={styles.content}>
                        <p className={styles.title}>
                            { this.props.title }
                        </p>
                        <Tooltip text='Copied!'>
                            <p
                            className={styles.description}
                            onClick={
                                this.onCopy.bind(
                                    this, (
                                        this.props?.isProfile ? this.props.description
                                        : `${this.props.description} - ${this.props.title}`
                                    )
                                )
                            }
                        >
                            { this.props.description }
                        </p>
                        </Tooltip>
                    </div>
                </div>
                {
                    this.props.activity?
                    <div className={styles.activity_block} > 
                        <div className={styles.info} >
                            {
                                this.props.activity.assets?
                                <div className={styles.activity_image}>
                                        <img alt='file' className={styles.large_image} src={ this.props.activity.assets.large_image? this.extractURLFromText(this.props.activity.assets.large_image) || `https://cdn.discordapp.com/app-assets/${this.props.activity.application_id}/${this.props.activity.assets.large_image}.png` : activity_image } />
                                        <img alt='file' className={styles.small_image} src={ this.props.activity.assets.small_image? this.extractURLFromText(this.props.activity.assets.small_image) || `https://cdn.discordapp.com/app-assets/${this.props.activity.application_id}/${this.props.activity.assets.small_image}.png` : null } />
                                </div>
                                :
                                <div className={styles.activity_image}>
                                    <img alt='file' className={styles.large_image} src={ activity_image } />
                                </div>
                            }
                            <div className={styles.activity_text} >
                                {
                                    this.props.activity.name?
                                    <span className={styles.title} >
                                        { this.props.activity.name }
                                    </span>
                                    :
                                    ""
                                }
                                {
                                    this.props.activity.state?
                                    <p className={styles.state} > {this.props.activity.state} </p>
                                    : 
                                    ""
                                }
                                {
                                    this.props.activity.details?
                                    <p className={styles.detalis} > { this.props.activity.details } </p>                        
                                    :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        )
    }

    onCopy(text) {
        return navigator.clipboard.writeText(text)
    }

    getActivityStatus(status) {
        let stylen = "";
    
        switch (status) {
            case "online":
                stylen = styles.online;
                break;
    
            case "dnd":
                stylen = styles.dnd;
                break;
    
            case "idle":
                stylen = styles.idle;
                break;
    
            case "offline":
                stylen = styles.offline;
                break;
        }
    
        return stylen;
    }

    extractURLFromText(text) {
        const parts = text.split("/");
        const startIndex = parts.findIndex(part => part.includes("https"));
        if (startIndex !== -1) {
            let url = parts.slice(startIndex).join("/");
            url = url.replace("https/", "https://");
            return url;
        } else {
            return undefined;
        }
    }
}