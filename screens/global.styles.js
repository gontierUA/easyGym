import Dimensions from 'Dimensions';

export var styles = {
    toolbar: {
        backgroundColor: '#0091EA',
        height: 56,
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
        elevation: 2,
        margin: 5,
        height: 36,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 14
    },
    screenTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    video: {
        backgroundColor: '#FFAAAA',
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').height - 50,
        transform: [{
            rotate: '90deg'
        }]
    }
};