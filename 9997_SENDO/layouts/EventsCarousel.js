import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableHighlight} from 'react-native';


const DEVICE_WIDTH = Dimensions.get("window").width - 10;

export default class EventsCarousel extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }

    setSelectedIndex = event => {
        // width of the viewSize
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        //get current position of the scrollview
        const contentOffset = event.nativeEvent.contentOffset.x;
        const selectedIndex = Math.floor(contentOffset / viewSize);
        this.setState({ selectedIndex });
    }
    componentDidMount = () => {
        setInterval(() => {
            this.setState(prev => ({
                selectedIndex: prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1
            }),
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: DEVICE_WIDTH * this.state.selectedIndex
                    })
                })
        }, 5000);
    }

    render() {
        const { images } = this.props;
        const { selectedIndex } = this.state;
        return (
            <View style={{ flex: 1, height: 220, marginVertical: 10, paddingHorizontal: 5 }}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.setSelectedIndex}
                    ref={this.scrollRef}
                >
                    {
                        images.map(image => {
                            return (
                                <TouchableHighlight key={image.id} onPress={()=>{console.log("press image event");}}>
                                    <Image
                                        source={image.source}
                                        style={styles.backgroundImage}
                                    />
                                </TouchableHighlight>
                            )
                        })
                    }
                </ScrollView>
                <View style={styles.circleDiv}>
                    {
                        images.map((image, i) => {
                            return (
                                <View key={image.id} style={[styles.whiteCircle,
                                { height: i === selectedIndex ? 12 : 2, backgroundColor: i === selectedIndex ? '#ec515a' : '#fff' }]}>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: DEVICE_WIDTH,
        height: 200,
        resizeMode: 'stretch',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleDiv: {
        width: '100%',
        height: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteCircle: {
        width: 12,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: "#fff",
    }
})