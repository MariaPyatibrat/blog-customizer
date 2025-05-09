import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
									  currentState,
									  onApply,
									  onReset,
								  }: ArticleParamsFormProps) => {
	// Переименовано в isMenuOpen для ясности
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const panelRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		// Прекращаем выполнение эффекта, если меню закрыто
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]); // Зависимость от isMenuOpen

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				ref={panelRef}
				className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
			>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title="Шрифт"
						onChange={handleFontFamilyChange}
					/>

					<RadioGroup
						name="fontSize"
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title="Размер шрифта"
						onChange={handleFontSizeChange}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title="Цвет шрифта"
						onChange={handleFontColorChange}
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title="Цвет фона"
						onChange={handleBackgroundColorChange}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title="Ширина контента"
						onChange={handleContentWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button title="Сбросить" htmlType="reset" type="clear" />
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};