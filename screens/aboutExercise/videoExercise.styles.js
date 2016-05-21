import Dimensions from 'Dimensions';

const CARD_WIDTH = Dimensions.get('window').width - 16;

export var styles = {
    wrapper: {
        paddingTop: 20,
        backgroundColor: '#E8E8E8'
    },
    floater: {
        height: 20
    },
    videoCard: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        elevation: 3,
        marginBottom: 15,
        marginLeft: 8,
        marginRight: 8
    },
    thumbnail: {
        width: CARD_WIDTH,
        height: CARD_WIDTH / 1.78
    },
    textHolder: {
        padding: 16,
        paddingBottom: 24
    },
    text: {
        marginTop: 8,
        color: '#000'
    }
};
