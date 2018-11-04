import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class InventoryApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddYourItem = this.handleAddYourItem.bind(this);
        this.chooseRamndomWeapon = this.chooseRamndomWeapon.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
  
        this.state = {
            itemList: [],
         
        };
    };

    handleAddYourItem(inputValue) {

        this.setState((prevState) => ({
            itemList: prevState.itemList.concat(inputValue).sort()
        }));
      
    };

   

    chooseRamndomWeapon() {
        
        const randomWeapon = Math.floor(Math.random() * this.state.itemList.length);
        const choosenWeapon = this.state.itemList[randomWeapon];
        if(this.state.itemList.length>0)
        return choosenWeapon;
    };

    handleDeleteAll() {

        this.setState(()=>({
            itemList:[]
            
        }));

    };


  

    handleDeleteItem(itemToRemove) {
        this.setState((prevState)=> ({
            itemList: prevState.itemList.filter((item) => {
                return itemToRemove !==item;
        })
        }));
    }

    render() {
        const title = 'Shopping App';
        const subtitle = 'Make a list of items';

        
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <AddItem handleAddYourItem={this.handleAddYourItem}/>
                <ChooseRandomly isDisabled={this.state.itemList.length>0}  handleDeleteAll = {this.handleDeleteAll} chooseRamndomWeapon = {this.chooseRamndomWeapon}/>
                <YourItems  handleDeleteItem={this.handleDeleteItem} items={this.state.itemList}/>
            </div>
        )
    };
};

const Header = (props) => {
    return (
        <div className = 'header'>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    );

};

const YourItems = (props) => {
    return (
        <div className = "item-container">
            {props.items.map((allItems) =>
                <Item 
                handleDeleteItem = {props.handleDeleteItem}
                itemsValue = {allItems}
                key={(Math.random()*99999999)*Math.random()*99999999 }
                >
                </Item>)}
        </div>
    );
};


const Item = (props) => {
    return ( <div className='list-items'>
            <p>{props.itemsValue}</p>
            <button
                className = 'delete-sinble-btn'
                onClick = { (e) => {props.handleDeleteItem(props.itemsValue)}}
            >
            <i className="fas fa-times"></i>
            </button>
            </div>
    )       
};

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddYourItem = this
            .handleAddYourItem
            .bind(this);
    };

    handleAddYourItem(e) {
        e.preventDefault();
        const inputValue = e.target.elements.addItemInput.value.trim();
        if (inputValue) {
            this.props.handleAddYourItem(inputValue);
        }
        e.target.elements.addItemInput.value = '';

    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddYourItem}>
                    <input autoComplete="off" type='text' name='addItemInput'/>
                    <button>Add Item</button>
                    
                </form>
            </div>
        );
    };
}

class ChooseRandomly extends React.Component {
    constructor(props) {
        super(props);
        this.chooseRamndomWeapon = this.chooseRamndomWeapon.bind(this);
        this.state = {
            randomBtnName: 'Random Item'
        };
    }

    chooseRamndomWeapon() {
        this.props.chooseRamndomWeapon();
        let btnName = this.props.chooseRamndomWeapon();
        if (btnName) {
        
        this.setState(()=> ({randomBtnName: `You choose:  ${btnName}`}));


    } 
        
        
    };

    render(){
        return (
            <div>
            <button disabled = {!this.props.isDisabled} onClick = {this.chooseRamndomWeapon} className='random-button'>
            {this.state.randomBtnName}
            </button>
            <button disabled = {!this.props.isDisabled} onClick = {this.props.handleDeleteAll} className ='random-button delete-all'>Delete All</button>
            </div>
        )
    }
};



ReactDOM.render(
    <InventoryApp/>, document.getElementById('app'));