import { CSSProperties } from "@material-ui/core/styles/withStyles";


export const StyleConstants = Object.freeze({
    arcaneOrange: {color:'#E04C2E'},
    link:{
        margin: '10px',
    }
});

export const styles = {
    customSwitch: {
        colorSwitchBase: {
            '&$colorChecked': {
                color: StyleConstants.arcaneOrange.color,
                '& + $colorBar': {
                    backgroundColor: StyleConstants.arcaneOrange.color,
                },
            },
        },
        colorDisabled: {
            '&$colorChecked': {
                color: '#bdbdbd',
                '& + $colorBar': {
                    backgroundColor: '#9e9e9e',
                },
            },
        },
        colorBar: {},
        colorChecked: {},
    },
    disabled: {
        cursor: 'not-allowed !important'
    }
}

export const superpose: CSSProperties = {
    position: 'absolute',
    top: '90%',
    right:'1%',
    marginRight: 15,
    float: 'right',
    align: 'bottom',
};
export const fav: CSSProperties = {
 float: 'right',
 align: 'center',
 background: '#E04C2E',
};

export const modalStyle: CSSProperties = {
    position: 'absolute',
    top: `45%`,
    left: `45%`,
    height: 136,
    width: 136,
    backgroundColor: '#fff',
  };