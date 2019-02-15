import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window")

export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {isEditing: false, todoValue: props.text};
    }
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id : PropTypes.string.isRequired,
        uncompletedToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    };

    render () {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>        
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    { isEditing ? (<TextInput style={[styles.text, styles.input, isCompleted? styles.completedText : styles.uncompletedText]}
                    value={toDoValue} multiline={true} onChangeText={this._controllInput} returnKeyType={"done"}
                    onBlur={this._finishEditing}/>) 
                    : (<Text style={[styles.text, isCompleted? styles.completedText : styles.uncompletedText]}>{ text }</Text>)}
                </View>
                    {isEditing ?
                        (<View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>Check</Text>
                                </View>

                            </TouchableOpacity>
                         </View>) : 
                         (<View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>Remove</Text>
                                </View>
                            </TouchableOpacity>
                         </View>)
                    }
            </View>
        );
    }
    _toggleComplete = () => {
        const { isCompleted, uncompletedToDo, completeToDo, id } = this.props;
        if(isCompleted){
            uncompletedToDo(id);
        } else {
            completeToDo(id);
        }
    };
    _startEditing = () => {
        this.setState ({
            isEditing: true
        });
    };
    _finishEditing = () => {
        const { toDoValue } = this.state;
        const { id, updateToDo } = this.props;
        updateToDo(id, toDoValue);
        this.setState ({
            isEditing: false
        });
    };
    _controllInput = text => {
        this.setState({ toDoValue : text });
    };
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"

    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width/2,
    },
    actions: {
        flexDirection: "row",

    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        paddingBottom: 5,
        width: width/2
    }
})