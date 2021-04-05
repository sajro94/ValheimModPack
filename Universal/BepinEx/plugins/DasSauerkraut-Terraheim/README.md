# Terraheim - Weapons/Tools/Armor
**Terraheim** is both an overhaul for Valheim's armor system with the goal of making each armor set viable all the way to the end of the game and a weapon expansion that fills the gaps in the games base roster. 
![Its ya boy, back at it again at the mountains](https://media.discordapp.net/attachments/610164117277245482/827282733658669056/unknown.png?width=960&height=540)
## Weapons and Tools
Nine new weapons and tools have been added with the goal of filling in the gaps in each tier.
These weapons are as follows: Bronze Battleaxe, Iron Knife, Forstasca (Silver Axe), Folcbrand (Silver Greatsword), Silver Kresja (Atgeir), Blackmetal Spear, Blackmetal Axehammer(Greataxe), and the much coveted Blackmetal Pickaxe.
Fire, Frost and Lightning bombs have been added as well!
![weapons](https://media.discordapp.net/attachments/610164117277245482/827283248425992282/unknown.png?width=892&height=640)
You can view damage values, moveset information, and recipes [here](https://docs.google.com/spreadsheets/d/1DlnnJOvorgCQ1k1e4lO5nF8M-QQpf7FZmO5bRj3mwLI/edit?usp=sharing) in the Weapons tab.
If you only want the new weapons, you can delete the Terraheim.dll file to disable the armor changes.
## Armor
Each piece of armor has been given its own unique effect and each armor set its own set bonus while also allowing armor to be 'uptiered,' which increases all of the piece's stats to be usable in the next tier of gameplay.
If you only want the armor changes, you can delete the TerraheimItems.dll file to disable the armor changes.
### Classes
Each armor set has been divided into three classes:
#### Berserkr
Berserkr's have a focus on dodging, axe damage, two handed weapon damage and stamina management. 

#### Bowman
Bowmen focus on dealing damage via, well bows, as well as daggers and spears. They focus on ammo consumption, backstab bonus, and sneaking. They have the worst armor rating in game.

#### Shieldbrother
Shieldbrothers are adept at blocking and have increased health. They can effectively deal damage with all melee weapons, but they are slower than the other classes. They have the highest armor rating in game.

You can view the full values for each set across every tier [here!](https://docs.google.com/spreadsheets/d/1DlnnJOvorgCQ1k1e4lO5nF8M-QQpf7FZmO5bRj3mwLI/edit?usp=sharing)

### Uptiering
As you progress through the game, you will be able to uptier armor. Essentially leveling the armor up to utilize the new materials you come across. When you do so, the armor set's armor rating increases, and every one of its bonuses becomes more effective.
For example, you can uptier the Bronze Helmet to become an Iron-Reinforced Bronze Helmet by combining a Bronze Helmet, some Iron, and some Deer Hide at the forge. By doing this, it's armor has increased from 15 to 19, and it's bonus(+5% Melee Damage) increases to +7% Melee Damage.
Uptiering means that you won't have chests full of out-dated equipment as you can continually have the armor set keep pace with your progression!
Note that to uptier padded armor, you have to use the Artisan Table asides from the forge or workbench.
## Utility Items
Currently two utility items have been added, the Aescfell Belt and the Stánbrysan Belt. These items increase your damage dealt to trees and ores, respectively.
## Balance
**Terraheim** is highly customizable as the effectiveness, material costs, and almost every armor stat can be tweaked in the `balance.json` file. Unfortunately, the same can not be said for weapons as of right now.
**Bow Balance** - To prevent bowmen from being the be all end all class, the bow weapon type has been slightly nerfed by halving movement speed while the bow is drawn. This can be mitigated by wearing silver armor, or if you don't like it at all, you can remove it by setting `"baseBowDrawMoveSpeeed"` to 1 in the `balance.json` file.
## Compatibility
There seems to be an incompatibility with ValheimLibOpenDatabasePatch.dll, I'm currently investigating.
TripleBronze also appears to be incompatible.
EpicLoot **IS** compatible, but there may be balance issues if both are installed.
## Future Plans
Flametal armor sets for each class
EpicLoot version with tweaked balance
### Known Issues
- You will appear naked on the character selection screen  
- Currently, armor set bonuses do not scale with uptiering.

### Recommended Mods
These mods compliment Terraheim by adding new weapons and rebalancing mechanics.
[Unique Weapons](https://www.nexusmods.com/valheim/mods/799) by v801
[Combat Overhaul](https://www.nexusmods.com/valheim/mods/591) by leseryk (*This is the inspiration for the weapon draw speed effect.*)
[Better Archery](https://www.nexusmods.com/valheim/mods/348?tab=description) by Elfking23

### Mirrors
[Github](https://github.com/DasSauerkraut/Terraheim)
[Nexus](https://www.nexusmods.com/valheim/mods/803?tab=description)

### Patchnotes
**v1.3.0**
- Added three new types of bombs! The Fire, Frost and Lightning Bomb
- Rebalanced Folcbrand to better fit the upcoming two handed weapon update
- Fixed issue with leather pants not scaling
- Actually fixed bug where set bonuses would not improve when an armor was uptiered for real this time.
- Fixed bugged particle effects for Forstasca and Blackmetal pickaxe
- The stutter bug has been fixed, we're just waiting on the release of the merged ValheimLib and JotunnLib!
**v1.2.1**
- Reworked Silver armor set bonus! It now provides a damage boost while below a set health percentage. You can prevent healing by crouching too!
- Replaced the Blackmetal Axehammer's alternate attack with an AoE slam ala Stagbreaker.
- Fixed bug where set bonuses would not improve when an armor was uptiered.
- Fixed(?) bug where errors would appear when two tree logs ran into each other.
**v1.2.0**
- Added in 9 new weapons and tools!
- Fixed error where the Block Power buff would continually stack to the moon. Sorry ¯\\_(ツ)\_/¯
**v1.1.1**
- Potential fix for the null reference in the mining/tree cutting patch.
- Fixed balance.json issue that caused Troll Leather Chest's effect to not function.
**v1.1.0**
- Added two new utility belts! The Aescfell Belt and the Stánbrysan Belt which increase your damage dealt to trees and ores, respectively.
- Fixed bug where uptiering armor removed the set bonus.
**v1.0.2:**
- Fixed bug with weird duplicating arrows when an arrow was refunded by an armor effect
- Moved Padded equipment to the forge so they can be upgraded
