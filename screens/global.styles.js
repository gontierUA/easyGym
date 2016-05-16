import Dimensions from 'Dimensions';

const TOOLBAR_HEIGHT = 56;

export var styles = {
    toolbar: {
        backgroundColor: '#0091EA',
        height: TOOLBAR_HEIGHT,
        elevation: 5
    },
    screenHolder: {
        backgroundColor: '#FFF'
    },
    container: {
        padding: 20,
        backgroundColor: '#FFF'
    },
    card: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0'
    },
    cardTitle: {
        fontSize: 15,
        color: '#000'
    },
    cardTextHolder: {
        paddingTop: 16
    },
    cardText: {
        fontSize: 16,
        lineHeight: 25,
        color: '#777'
    },
    button: {
        width: 140,
        padding: 15,
        elevation: 3,
        margin: 5
    },
    video: {
        height: Dimensions.get('window').height - TOOLBAR_HEIGHT - 90
    },
    screenTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    thumbnail: {
        width: 320,
        height: 180
    }
};