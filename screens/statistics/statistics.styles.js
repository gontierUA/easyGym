import Dimensions from 'Dimensions';

export var styles = {
    container: {
        backgroundColor: '#FFF'
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        height: 64,
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.87)'
    },
    holder: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        height: 48,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    date: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.87)',
        paddingRight: 15
    },
    text: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.87)',
        width: (Dimensions.get('window').width - 40) / 6
    }
};
